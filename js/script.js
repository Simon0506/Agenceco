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


// Récupération et affichage des articles de l'API
const articles = document.querySelector('#articles')

const titre = document.querySelectorAll('.title')
const titres = Array.from(titre)

const date = document.querySelectorAll('.publicationDate')
const dates = Array.from(date)

const description = document.querySelectorAll('.description')
const descriptions = Array.from(description)

const content = document.querySelectorAll('.content')
const contents = Array.from(content)

fetch('http://localhost:3000/articles')
    .then (response => response.json())
    .then (articlesAPI => {
      for (let i=0; i<articles.children.length; i++) {
        titres[i].textContent = articlesAPI[i].title
        dates[i].textContent = articlesAPI[i].publicationDate
        descriptions[i].textContent = articlesAPI[i].description
        contents[i].textContent = articlesAPI[i].content
        }
      });



// Authentification de l'utilisateur

fetch('http://localhost:3000/login',{method:'POST'})
      .then (log => //log.json())
      //.then (login => {
        console.log(log)
      )



