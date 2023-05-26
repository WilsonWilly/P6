// Récupérer le formulaire de connexion
const loginForm = document.getElementById('login-form');

const API_URL = 'http://localhost:5678/api'

const postLogin = async (data) => fetch(`${API_URL}/users/login`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'post',
    body: JSON.stringify(data)
}).then(response => response.json())

// Écouter l'événement de soumission du formulaire
loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Empêcher le rechargement de la page

    // Récupérer les valeurs des champs d'identifiant et de mot de passe
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    postLogin({ "email": username, "password": password })
        .then(data => {
            if (data.token) {
                localStorage.token = data.token
                // Redirection vers la page d'accueil
                window.location.href = `${window.location.origin}/index.html`
            } else {
                // Afficher le message d'erreur
                const errorMessage = document.getElementById('error-message');
                errorMessage.textContent = 'Erreur dans l\'identifiant ou le mot de passe';
            }
        })
});