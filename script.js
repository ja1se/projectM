// slide
const slide = document.querySelectorAll('.slide');
const indicator = document.querySelector('.slide-indicator')
let currentIndex = 0;

function nextSlide() {
  slide[currentIndex].classList.remove('active');
  currentIndex = (currentIndex + 1) % slide.length;
  slide[currentIndex].classList.add('active');
  if(indicator) {
    indicator.innerText = `${currentIndex + 1} / ${slides.length}`;
  }
}

let slideTimer = setInterval(nextSlide, 8000);

const prevBtn = document.querySelector('.slide-button.prev');
const nextBtn = document.querySelector('.slide-button.next');

nextBtn.addEventListener('click', () => {
  nextSlide();
});

prevBtn.addEventListener('click', () => {
  slide[currentIndex].classList.remove('active');
  currentIndex = (currentIndex - 1 + slide.length) % slide.length;
  slide[currentIndex].classList.add('active');
  if(indicator) indicator.innerText = `${currentIndex + 1} / ${slide.length}`;
});

