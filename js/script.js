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


if (token && connect) {
  connect.innerText = 'Me déconnecter'
  connect.addEventListener ('click', () => {
      connect.href = '#'
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


