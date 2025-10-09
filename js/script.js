const burger = document.getElementById('burger')
const nav = document.getElementById('menu')
const croix = document.getElementById('croix')

burger.addEventListener ('click', () => {
  nav.style.display = 'flex'
  croix.style.display = 'block'
  burger.style.display = 'none'
});

croix.addEventListener ('click', () => {
  nav.style.display = 'none'
  croix.style.display = 'none'
  burger.style.display = 'flex'
});