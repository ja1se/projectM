const swiper1 = new Swiper(".swiper", {
  autoplay: {
    delay: 2000,
    pauseOnMouseEnter:true,
  },
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl:'.swiper-button-next',
    prevEl:'.swiper-button-prev',
  }
});