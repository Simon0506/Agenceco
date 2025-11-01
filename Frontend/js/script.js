if (window.location.pathname === "/") {
    window.location.replace("/index.html");
  }

// Menu burger 

const burger = document.getElementById('burger');
const nav = document.getElementById('menu');
const croix = document.getElementById('croix');
const connect = document.getElementById('connect-btn')
const token = localStorage.getItem('token')


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

if (window.location.pathname.endsWith('index.html')) {
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

}

//enregistrement de l'url précédente pour revenir après la connexion
if (connect) {
  connect.addEventListener('click', () => {
    sessionStorage.setItem('previousPage', window.location.href)
  })
}

// déconnexion sans revenir sur la page login
if (token && connect) {
  connect.innerText = 'Me déconnecter'
  connect.href = '#'
  connect.addEventListener ('click', () => {
      localStorage.removeItem('token')
      connect.innerText = 'Me connecter'
      window.location.reload()
  })
}

      
// Display none de la page d'actualités si !token
if (window.location.pathname.endsWith('blog.html') && !token) {
    document.getElementById('addNewsBtn').style.display = 'none'
    const btnModify = Array.from(document.querySelectorAll('.btn-modify'))
    for (let u=0; u<btnModify.length; u++) {
        btnModify[u].style.display = 'none'
    }
}


