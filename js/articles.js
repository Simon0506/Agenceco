//Récupération des articles
fetch('http://localhost:3000/articles')
.then (response => response.json())
.then (articlesAPI => {
    const reversed = articlesAPI.reverse()

    for (let r=0; r<reversed.length; r++) {
        reversed[r].id = reversed.length - r
    }

// Supprimer un article et MAJ des articles
    if (token && window.location.pathname.endsWith('blog.html')) {
        const supprimer = Array.from(document.querySelectorAll('.deleteNews'))

        for (let s=0; s<supprimer.length; s++) {
            supprimer[s].addEventListener('click', async (e) => {
                e.preventDefault()

                //Demande de confirmation
                const confirmation = confirm('Etes vous sûr de vouloir supprimer cet article ?')

                if (!confirmation) {
                    alert('Suppression annulée.')
                    return
                } else {
                    try {
                        const result = await fetch('http://localhost:3000/articles/' + (reversed.length-s), {
                            method: 'DELETE',
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'Content-type': 'application/json'
                            }
                        })
                        if (!result.ok) {
                            throw new Error('Suppression impossible')
                            return result.json()
                        }
                        alert('Article supprimé')
                        window.location.reload()
                    } catch (error) {
                        alert('Une erreur est survenue.', error)
                    }
                }
            })
        }

        const news = Array.from(document.querySelectorAll('.news'))
        const diff = news.length-reversed.length
        const articles = Array.from(document.getElementById('articles').children)
        const bloc = document.getElementById('article')
        const copie = bloc.cloneNode(true)
        copie.removeAttribute("id")

        if (diff > 0) {
            //suppression d'un bloc
            news.splice(-diff, diff)
            for (let n=0; n<articles.length; n++) {
                if (!news[n]) {
                    articles[n].remove()
                }
            }
        } else if (diff <0) {
            //ajout d'un bloc
            bloc.insertAdjacentElement('afterend', copie)
        }

    }

// Affichage des actualités
    if ((token && window.location.pathname.endsWith('blog.html')) || window.location.pathname.endsWith('index.html')) {

        const titres = Array.from(document.querySelectorAll('.title'))
        const dates = Array.from(document.querySelectorAll('.publicationDate'))
        const descriptions = Array.from(document.querySelectorAll('.description'))
        const contents = Array.from(document.querySelectorAll('.content'))

        for (let i=0; i<reversed.length; i++) {
            console.log(titres[i])
                titres[i].textContent = reversed[i].title 
                if (window.location.pathname.endsWith('blog.html')) {
                    dates[i].textContent = 'Publié le ' + reversed[i].publicationDate
                } else {
                    dates[i].textContent = reversed[i].publicationDate
                }
                descriptions[i].textContent = reversed[i].description
                contents[i].textContent = reversed[i].content
        }
    }



// Ajout d'une actualité
    if (token && window.location.pathname.endsWith('addNews.html')) {
        document.getElementById('saveForm').addEventListener('submit', async(save) => {
            save.preventDefault()
            const newArticle = {
                title: document.getElementById('newTitle').value,
                description: document.getElementById('newDescription').value,
                content: document.getElementById('newContent').value
            }
            try {
                const req = await fetch('http://localhost:3000/articles', {
                    method: 'POST',
                    headers: {'Content-type': 'application/json'},
                    body: JSON.stringify(newArticle)
                })
                
                if (!req.ok) {
                    document.getElementById('messageAdd').innerText = 'Problème d\'envoi du formulaire.'
                } else {
                    document.getElementById('messageAdd').innerText = 'Article ajouté avec succès !'
                    document.getElementById('messageAdd').style.color = 'green'
                }
            } catch (error) {
                console.error('Erreur :', error)
                alert('Une erreur est survenue')
            }
        })
    }
})



