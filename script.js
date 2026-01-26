// 캐러셀 기능
class carousel {
  constructor() {
    this.currentSlide = 0;
    this.slides = document.querySelectorAll(".carousel-slide");
    this.prevBtn = document.querySelector(".carousel-button.prev");
    this.nextBtn = document.querySelector(".carousel-button.next");
    this.indicator = document.querySelector(".carousel-indicator");

    this.init();
  }

  init() {
    if (!this.slides.length) return;

    this.prevBtn?.addEventListener("click", () => this.prev());
    this.nextBtn?.addEventListener("click", () => this.next());

    // 자동 재생 (5초마다)
    setInterval(() => this.next(), 5000);
  }

  show(index) {
    this.slides.forEach((slide) => slide.classList.remove("active"));
    this.slides[index].classList.add("active");
    this.currentSlide = index;

    if (this.indicator) {
      this.indicator.textContent = `${index + 1} / ${this.slides.length}`;
    }
  }

  next() {
    const nextIndex = (this.currentSlide + 1) % this.slides.length;
    this.show(nextIndex);
  }

  prev() {
    const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.show(prevIndex);
  }
}

// 탭 필터 기능
class tabfilter {
  constructor() {
    this.tabs = document.querySelectorAll(".tab");
    this.init();
  }

  init() {
    this.tabs.forEach((tab) => {
      tab.addEventListener("click", (e) => {
        this.tabs.forEach((t) => t.classList.remove("active"));
        e.target.classList.add("active");

        // 필터링 로직 (실제 구현 시 데이터와 연동)
        const category = e.target.textContent;
        this.filterProducts(category);
      });
    });
  }

  filterproducts(category) {
    // 제품 필터링 로직
    console.log(`Filtering by: ${category}`);
  }
}

// 플로팅 버튼 기능
class floatingbuttons {
  constructor() {
    this.recentButton = document.querySelectorAll(".floating-button")[0];
    this.topButton = document.querySelectorAll(".floating-button")[1];

    this.init();
  }

  init() {
    if (this.topButton) {
      this.topButton.addEventListener("click", () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });
    }

    // 스크롤 시 상단 버튼 표시/숨김
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        this.topButton?.parentElement.style.opacity = "1";
      } else {
        this.topButton?.parentElement.style.opacity = "0";
      }
    });
  }
}

// 앱 배너 닫기
class appbanner {
  constructor() {
    this.banner = document.querySelector(".app-banner");
    this.closeBtn = document.querySelector(".close-button");

    this.init();
  }

  init() {
    this.closeBtn?.addEventListener("click", () => {
      this.banner.style.display = "none";
    });
  }
}

// 모바일 메뉴 토글
class mobilemenu {
  constructor() {
    this.menuButton = document.querySelector(".menu-button");
    this.navigation = document.querySelector(".navigation");

    this.init();
  }

  init() {
    if (window.innerWidth <= 768) {
      this.createMenuButton();
    }

    window.addEventListener("resize", () => {
      if (window.innerWidth <= 768) {
        this.createMenuButton();
      } else {
        this.removeMenuButton();
      }
    });
  }

  createmenubutton() {
    if (this.menuButton) return;

    const button = document.createElement("button");
    button.className = "menu-button";
    button.innerHTML = "☰";
    button.style.cssText = "font-size: 24px; padding: 0; width: 40px; height: 40px;";

    const header = document.querySelector(".header");
    header?.insertBefore(button, header.firstChild);

    button.addEventListener("click", () => {
      this.navigation?.classList.toggle("active");
    });

    this.menuButton = button;
  }

  removemenubutton() {
    this.menuButton?.remove();
    this.menuButton = null;
    this.navigation?.classList.remove("active");
  }
}

// 장바구니 수량 업데이트
class cart {
  constructor() {
    this.count = 0;
    this.countElement = document.querySelector(".cart-count");
  }

  addItem() {
    this.count++;
    this.updateDisplay();
  }

  removeItem() {
    if (this.count > 0) {
      this.count--;
      this.updateDisplay();
    }
  }

  updateDisplay() {
    if (this.countElement) {
      this.countElement.textContent = this.count;
    }
  }
}

// Lazy Loading 이미지
class lazyload {
  constructor() {
    this.images = document.querySelectorAll("img[data-src]");
    this.init();
  }

  init() {
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute("data-src");
            observer.unobserve(img);
          }
        });
      });

      this.images.forEach((img) => observer.observe(img));
    } else {
      // 폴백: IntersectionObserver 미지원 브라우저
      this.images.forEach((img) => {
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
      });
    }
  }
}

// 부드러운 스크롤
class smoothscroll {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute("href"));

        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });
  }
}

// 초기화
document.addEventListener("DOMContentLoaded", () => {
  new carousel();
  new tabfilter();
  new floatingbuttons();
  new appbanner();
  new mobilemenu();
  new lazyload();
  new smoothscroll();

  // 전역 장바구니 인스턴스
  window.cart = new cart();
});

// 스크롤 애니메이션
const observeelements = () => {
  const elements = document.querySelectorAll(".article, .featured-article");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    {
      threshold: 0.1,
    },
  );

  elements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s, transform 0.6s";
    observer.observe(el);
  });
};

// 페이지 로드 후 애니메이션 시작
window.addEventListener("load", observeElements);

// 검색 기능
const setupSearch = () => {
  const searchButton = document.querySelector('.icon-button[aria-label="검색"]');

  searchButton?.addEventListener("click", () => {
    // 검색 모달 또는 검색 페이지로 이동
    alert("검색 기능은 추후 구현됩니다.");
  });
};

setupSearch();

