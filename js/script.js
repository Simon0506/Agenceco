// Menu burger 

const burger = document.getElementById('burger');
const nav = document.getElementById('menu');
const croix = document.getElementById('croix');

burger.addEventListener ('click', () => {
  nav.classList.toggle('open');
  croix.style.display = 'block';
  burger.style.display = 'none';
});

croix.addEventListener ('click', () => {
  nav.classList.toggle('open');
  croix.style.display = 'none';
  burger.style.display = 'flex';
});


// Slider 

const prev = document.getElementById('prev');
const next = document.getElementById('next');
const slides = document.getElementById('slides');
const nbSlides = slides.children.length;

let slide = 0;

prev.addEventListener ('click', () => {
  console.log('click à gauche')
  slide = slide - 1;
  if(slide < 0) {
    slide = nbSlides - 1;
  }
  changeSlide();
})

next.addEventListener ('click', () => {
  console.log('click à droite')
  slide = slide + 1;
  if(slide >= nbSlides) {
    slide = 0
  }
  changeSlide();
})

function changeSlide() {
  slides.style.transform = 'translateX(-' + (slide*100) + '%)';
}

setInterval(() => {
  slide = slide + 1;
  if(slide >= nbSlides) {
    slide = 0
  }
  changeSlide();
}, 5000)