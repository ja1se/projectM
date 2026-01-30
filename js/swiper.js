const swiper1 = new Swiper(".swiper", {
  //객체표기법
  autoplay: {
    delay: 2000,
    pauseOnMouseEnter:true,
  },
  loop: true,
  //객체자료형
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl:'.swiper-button-next',
    prevEl:'.swiper-button-prev',
  }
});