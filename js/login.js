// Authentification de l'utilisateur

document.getElementById('loginForm').addEventListener ('submit', async (e) => {
    e.preventDefault()

    const email = document.getElementById('emailLog').value
    const password = document.getElementById('passwordLog').value 
    const messageLog = document.getElementById('messageLog')

    try {
        //  Envoi des identifiants à l’API
        const res = await fetch('http://localhost:3000/login', {
        method:'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({email, password})
        })

        //  Récupération de la réponse
        const data = await res.json()

        if (!res.ok) {
            messageLog.innerText = data.message || 'Erreur de connexion'
            return
        } else {
            //  Si authentification réussie
            messageLog.innerText = 'Connexion réussie'
            messageLog.style.color = 'green'

            //  Stockage du token JWT dans le navigateur
            localStorage.setItem('token', data.token)

            //  Redirection vers la page précédente
            window.history.back()
        }

    } catch (error) {
        console.error('Erreur', error)
        document.getElementById('messageLog').innerText = 'Une erreur est survenue.'
    }
})



      