const swiper1 = new Swiper(".swiper1", {
  // ★ 핵심 설정: 슬라이드 너비를 CSS(.swiper-slide)에 설정한 대로 따름
  slidesPerView: "auto",

  // 슬라이드 사이 간격 (0이면 다음 사진이 바로 붙어서 나옴)
  spaceBetween: 0,

  // 무한 반복
  loop: true,

  // 자동 재생 (8초)
  autoplay: {
    delay: 2000,
    disableOnInteraction: true,
  },

  // 화살표 및 페이지네이션
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
// // 1. 슬라이드 로직 수정
// const slide = document.querySelectorAll('.slide');
// const indicator = document.querySelector('.slide-indicator');
// let currentIndex = 0;

// function updateIndicator() {
//   if (indicator) {
//     // slides.length -> slide.length 로 수정!
//     indicator.innerText = `${currentIndex + 1} / ${slide.length}`;
//   }
// }

// function nextSlide() {
//   slide[currentIndex].classList.remove('active');
//   currentIndex = (currentIndex + 1) % slide.length;
//   slide[currentIndex].classList.add('active');
//   updateIndicator();
// }

// let slideTimer = setInterval(nextSlide, 8000);

// const prevBtn = document.querySelector('.slide-button.prev');
// const nextBtn = document.querySelector('.slide-button.next');

// if (nextBtn) {
//   nextBtn.addEventListener('click', () => {
//     clearInterval(slideTimer); // 버튼 클릭 시 타이머 초기화 센스!
//     nextSlide();
//     slideTimer = setInterval(nextSlide, 8000);
//   });
// }

// if (prevBtn) {
//   prevBtn.addEventListener('click', () => {
//     clearInterval(slideTimer);
//     slide[currentIndex].classList.remove('active');
//     currentIndex = (currentIndex - 1 + slide.length) % slide.length;
//     slide[currentIndex].classList.add('active');
//     updateIndicator();
//     slideTimer = setInterval(nextSlide, 8000);
//   });
// }

// 2. product-grid 드래그 기능 (보강)
const sliders = document.querySelectorAll(".product-grid");

sliders.forEach((slider) => {
  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener("mousedown", (e) => {
    isDown = true;
    slider.style.scrollBehavior = "auto"; // 드래그 시 smooth 끄기
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener("mouseleave", () => {
    isDown = false;
  });

  slider.addEventListener("mouseup", () => {
    isDown = false;
    slider.style.scrollBehavior = "smooth"; // 다시 smooth 켜기
  });

  slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;
    slider.scrollLeft = scrollLeft - walk;
  });
});

// 3. 탭 메뉴 기능
const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const targetId = tab.dataset.tab;
    const targetContent = document.getElementById(targetId);

    if (!targetContent) return; // ID가 없으면 실행 안 함

    tabs.forEach((t) => t.classList.remove("active"));
    contents.forEach((c) => c.classList.remove("active"));

    tab.classList.add("active");
    targetContent.classList.add("active");

    targetContent.scrollLeft = 0;
  });
});

// 4. 카테고리
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
      slidesPerView: 10, // 데스크탑 (사진처럼 한 줄에 다 보임)
    },
  },
});

// 5. 푸터
const infoToggle = document.querySelector(".footer-column.center");
infoToggle.addEventListener("click", function () {
  document.querySelector(".social-links").style.display = "none";
  this.classList.toggle("active");
});
