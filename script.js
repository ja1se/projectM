const swiper1 = new Swiper(".swiper1", {
  slidesPerView: "auto",
  spaceBetween: 0,
  loop: true,
  autoplay: {
    delay: 2000,
    disableOnInteraction: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    type: "fraction",
    renderFraction: function (currentClass, totalClass) {
      return '<span class="' + currentClass + '"></span>' + '<span class="divider"> &nbsp;/&nbsp; </span>' + '<span class="' + totalClass + '"></span>';
    },
  },
});

let lastScrollY = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  if (currentScrollY > lastScrollY && currentScrollY > 90) {
    header.classList.add('hide');
  } else {
    header.classList.remove('hide');
  }
  lastScrollY = currentScrollY;
});

// product-grid 드래그 기능
const sliders = document.querySelectorAll(".product-grid");

sliders.forEach((slider) => {
  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener("mousedown", (e) => {
    isDown = true;
    slider.style.scrollBehavior = "auto";
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener("mouseleave", () => {
    isDown = false;
  });

  slider.addEventListener("mouseup", () => {
    isDown = false;
    slider.style.scrollBehavior = "smooth";
  });

  slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;
    slider.scrollLeft = scrollLeft - walk;
  });
});

// 탭 메뉴 기능
const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const targetId = tab.dataset.tab;
    const targetContent = document.getElementById(targetId);

    if (!targetContent) return;

    tabs.forEach((t) => t.classList.remove("active"));
    contents.forEach((c) => c.classList.remove("active"));

    tab.classList.add("active");
    targetContent.classList.add("active");

    targetContent.scrollLeft = 0;
  });
});

// 카테고리
const categorySwiper = new Swiper(".category-swiper", {
  slidesPerView: 5, // 모바일 기본 개수
  spaceBetween: 20, // 아이템 사이 간격
  loop: false, // 마지막에서 처음으로 돌아갈지 여부
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  // 브라우저 너비에 따른 반응형 설정
  breakpoints: {
    768: {
      slidesPerView: 8, // 태블릿
    },
    1024: {
      slidesPerView: 10, // 데스크탑 (한 줄에 다 보임)
    },
  },
});

// 푸터
const infoToggle = document.querySelector(".footer-column.center");
infoToggle.addEventListener("click", function () {
  document.querySelector(".social-links").style.display = "none";
  this.classList.toggle("active");
});

// 검색창 토글
const searchButton = document.querySelector('.search-button');
const searchContainer = document.querySelector('.search-container');
const searchInput = document.querySelector('.search-input');

searchButton.addEventListener('click', (e) => {
  e.stopPropagation();
  searchContainer.classList.toggle('active');
  if (searchContainer.classList.contains('active')) {
    searchInput.focus();
  }
});

// 외부 클릭 시 검색창 닫기
document.addEventListener('click', (e) => {
  if (!searchContainer.contains(e.target) && searchContainer.classList.contains('active')) {
    searchContainer.classList.remove('active');
  }
});

// 검색 팝업 기능
document.addEventListener('DOMContentLoaded', () => {
    const searchTrigger = document.getElementById('search-trigger');
    const searchPopup = document.getElementById('search-popup');
    const overlay = document.getElementById('overlay');
    const closeBtn = document.getElementById('close-popup');

    // Function to open the popup
    const openPopup = (e) => {
        if (e) e.preventDefault();
        searchPopup.classList.add('On');
        overlay.classList.add('On');
        // Prevent scrolling while popup is open
        document.body.style.overflow = 'hidden';
    };

    // Function to close the popup
    const closePopup = () => {
        searchPopup.classList.remove('On');
        overlay.classList.remove('On');
        // Restore scrolling
        document.body.style.overflow = '';
    };

    // Click events
    searchTrigger.addEventListener('click', openPopup);
    closeBtn.addEventListener('click', closePopup);
    
    // Close when clicking the background overlay
    overlay.addEventListener('click', closePopup);

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closePopup();
        }
    });
});

// 앱 배너 닫기 기능
document.addEventListener('DOMContentLoaded', () => {
  const appBanner = document.querySelector('.app-banner');
  const closeButton = appBanner ? appBanner.querySelector('.close-button') : null;

  if (appBanner && closeButton) {
    closeButton.addEventListener('click', () => {
      appBanner.classList.add('hide');
    });
  }
});

// 맨 위로 가기 버튼 기능
document.addEventListener('DOMContentLoaded', () => {
  const topBtn = document.querySelector('.top-btn');

  if (topBtn) {
    // 클릭 시 맨 위로 스크롤
    topBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    // 스크롤 위치에 따른 버튼 표시 제어
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        topBtn.style.opacity = '1';
        topBtn.style.visibility = 'visible';
      } else {
        topBtn.style.opacity = '0';
        topBtn.style.visibility = 'hidden';
      }
    });
    
    // 초기 상태 설정
    topBtn.style.transition = 'opacity 0.3s, visibility 0.3s';
    topBtn.style.opacity = '0';
    topBtn.style.visibility = 'hidden';
  }
});