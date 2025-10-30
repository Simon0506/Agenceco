//Récupération des articles
fetch('https://agenceco-st.alwaysdata.net/articles')
.then (response => response.json())
.then (articlesAPI => {
    const reversed = articlesAPI.reverse()
    
    for (let r=0; r<reversed.length; r++) {
        reversed[r].id = reversed.length - r
    }

// Affichage des actualités et MAJ des blocs html
    if (window.location.pathname.endsWith('blog.html') || window.location.pathname.endsWith('index.html')) {

        const news = Array.from(document.querySelectorAll('.news'))
        const diff = news.length-reversed.length
        const articles = Array.from(document.getElementById('articles').children)
        const bloc = document.getElementById('article')
        const copie = bloc.cloneNode(true)
        copie.removeAttribute("id")

        // MAJ de l'affichage des blocs html
        if (diff > 0) {
            //suppression d'un bloc
            news.splice(-diff, diff)
            for (let n=0; n<articles.length; n++) {
                if (!news[n]) {
                    articles[n].remove()
                }
            }
        } else if (diff <0 && (!window.location.pathname.endsWith('index.html') || (news.length < 3))) {
            
            //ajout d'un bloc
                bloc.insertAdjacentElement('afterend', copie)
             
        }
// Si pas d'actualités
        if (news.length === 0) {
             document.getElementById('noArticle').innerText = 'Aucune actualité pour le moment.'
        }

// Affichage des actualités  
        const titres = Array.from(document.querySelectorAll('.title'))
        const dates = Array.from(document.querySelectorAll('.publicationDate'))
        const descriptions = Array.from(document.querySelectorAll('.description'))
        const contents = Array.from(document.querySelectorAll('.content'))

        if (window.location.pathname.endsWith('index.html')) {
            for (let i=0;  i<3; i++) {
                titres[i].innerText = reversed[i].title 
                dates[i].innerText = reversed[i].publicationDate.split('-').reverse().join('/')
                descriptions[i].innerText = reversed[i].description
                contents[i].innerText = reversed[i].content
            }   
        } else {
            for (let i=0; i<reversed.length; i++) {
                titres[i].innerText = reversed[i].title
                dates[i].innerText = 'Publié le ' + reversed[i].publicationDate.split('-').reverse().join('/')
                descriptions[i].innerText = reversed[i].description
                contents[i].innerText = reversed[i].content
            }
        } 
    }

// Detail de l'actualité
    if (window.location.pathname.includes('detail.html')) {
        const articleID = new URLSearchParams(window.location.search).get('id')
        const nextArticle = Number(articleID) + 1
        const prevArticle = Number(articleID) - 1
        //chargement de l'article
        fetch(`https://agenceco-st.alwaysdata.net/articles/${articleID}`)
            .then (res => {
                if (!res.ok) {
                    throw new Error ('Erreur lors du chargement')
                }
                return res.json()
            })
            .then (article => {
                document.getElementById('detailTitle').textContent = article.title
                document.getElementById('detailDate').textContent = article.publicationDate.split('-').reverse().join('/')
                document.getElementById('detailDescription').textContent = article.description                    
                document.getElementById('detailContent').textContent = article.content                    
            })
            .catch(err => console.error(err))
        
        if (Number(articleID) != 1) {
            document.getElementById('PrevNews').addEventListener('click', () => {
                window.location.href = `detail.html?id=${prevArticle}`
            })
        } else {
            document.getElementById('PrevNews').style.display = 'none'
            document.getElementById('PrevNews').parentElement.style.justifyContent = 'right'
        }
        if (articleID < reversed.length) {
            document.getElementById('NextNews').addEventListener('click', () => {
                window.location.href = `detail.html?id=${nextArticle}`
            })
        } else {
            document.getElementById('NextNews').style.display = 'none'
            document.getElementById('NextNews').parentElement.style.justifyContent = 'left'
        }
        
    }


// Supprimer un article et modifier un article
    if (window.location.pathname.endsWith('blog.html')) {
        const supprimer = Array.from(document.querySelectorAll('.deleteNews'))
        const modifier = Array.from(document.querySelectorAll('.updateNews'))
        const clickbox = Array.from(document.querySelectorAll('.clickbox'))

        for (let s=0; s<clickbox.length; s++) {
            if (token) {
                const articleId = reversed.length - s
                supprimer[s].addEventListener('click', async (e) => {
                    e.preventDefault()
    
                    //Demande de confirmation
                    const confirmation = confirm('Etes vous sûr de vouloir supprimer cet article ?')
    
                    if (!confirmation) {
                        alert('Suppression annulée.')
                        return
                    } else {
                        try {
                            const result = await fetch(`https://agenceco-st.alwaysdata.net/articles/${articleId}`, {
                                method: 'DELETE',
                                headers: {
                                    'Authorization': `Bearer ${token}`,
                                    'Content-type': 'application/json'
                                }
                            })
                            if (!result.ok) {
                                throw new Error('Suppression impossible')
                            }
                            alert('Article supprimé')
                            window.location.reload()
                        } catch (error) {
                            alert('Une erreur est survenue.', error)
                        }
                    }
                })
    
                modifier[s].addEventListener('click', () => {
                    window.location.href=`updateNews.html?id=${articleId}`
                })
            }

            clickbox[s].addEventListener('click', () => {
                    window.location.href = `detail.html?id=${reversed[s].id}`
                })
        }

        
    }
    
    

// Modifier un article
    if (token && window.location.pathname.includes('updateNews.html')) {

        const articleID = new URLSearchParams(window.location.search).get('id')

        //chargement de l'article
        fetch(`https://agenceco-st.alwaysdata.net/articles/${articleID}`)
            .then (res => {
                if (!res.ok) {
                    throw new Error ('Erreur lors du chargement')
                }
                return res.json()
            })
            .then (article => {
                document.getElementById('updateTitle').value = article.title
                document.getElementById('updateContent').value = article.content
                document.getElementById('updateDescription').value = article.description                    
            })
            .catch(err => console.error(err))                
        
        // MAJ de l'article    
        document.getElementById('updateForm').addEventListener('submit', async (e) => {
            e.preventDefault()

            const articleUpdated = {
                title: document.getElementById('updateTitle').value,
                content: document.getElementById('updateContent').value,
                description: document.getElementById('updateDescription').value
            }

            try {
                const req = await fetch (`https://agenceco-st.alwaysdata.net/articles/${articleID}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,'Content-type': 'application/json'
                    },
                    body: JSON.stringify(articleUpdated)
                })
                if (!req.ok) {
                    throw new Error('Erreur lors de l\'envoi')
                }
                alert('Article mis à jour avec succès !')
                window.location.href = 'blog.html'

            } catch (error) {
                console.error('Erreur :', error)
                alert('Une erreur est survenue')
            }
        })

        //suppression de l'article
        document.getElementById('deleteBtn').addEventListener('click', async (e) => {
                e.preventDefault()

                //Demande de confirmation
                const confirmation = confirm('Etes vous sûr de vouloir supprimer cet article ?')

                if (!confirmation) {
                    alert('Suppression annulée.')
                    return
                } else {
                    try {
                        const req = await fetch(`https://agenceco-st.alwaysdata.net/articles/${articleID}`, {
                            method: 'DELETE',
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'Content-type': 'application/json'
                            }
                        })
                        if (!req.ok) {
                            throw new Error('Suppression impossible')
                        }
                        alert('Article supprimé')
                        window.location.href = 'blog.html'
                    } catch (error) {
                        alert('Une erreur est survenue.', error)
                    }
                }
            })
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
                const req = await fetch('https://agenceco-st.alwaysdata.net/articles', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(newArticle)
                })
                
                if (!req.ok) {
                    document.getElementById('messageAdd').innerText = 'Problème d\'envoi du formulaire.'
                } else {
                    alert('Article ajouté avec succès !')
                    window.location.href = 'blog.html'
                }
            } catch (error) {
                console.error('Erreur :', error)
                alert('Une erreur est survenue')
            }
        })
    }
})



