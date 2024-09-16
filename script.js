document.addEventListener('DOMContentLoaded', function() {
    const langButtons = document.querySelectorAll('.lang-icon');
    const loginForm = document.getElementById('loginForm');
    const loginButton = document.getElementById('loginButton');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const forgotPasswordLink = document.getElementById('forgotPassword');
    const registerLink = document.getElementById('register');

    let currentLang = 'it'; // Lingua predefinita

    const translations = {
        it: {
            username: 'Nome utente',
            password: 'Password',
            login: 'Accedi',
            forgotPassword: 'Password dimenticata?',
            register: 'Registrati'
        },
        fr: {
            username: 'Nom d\'utilisateur',
            password: 'Mot de passe',
            login: 'Connexion',
            forgotPassword: 'Mot de passe oublié ?',
            register: 'S\'inscrire'
        },
        de: {
            username: 'Benutzername',
            password: 'Passwort',
            login: 'Anmelden',
            forgotPassword: 'Passwort vergessen?',
            register: 'Registrieren'
        },
        en: {
            username: 'Username',
            password: 'Password',
            login: 'Login',
            forgotPassword: 'Forgot password?',
            register: 'Register'
        }
    };

    function updateLanguage(lang) {
        currentLang = lang;
        usernameInput.placeholder = translations[lang].username;
        passwordInput.placeholder = translations[lang].password;
        loginButton.textContent = translations[lang].login;
        forgotPasswordLink.textContent = translations[lang].forgotPassword;
        registerLink.textContent = translations[lang].register;

        langButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            }
        });
    }

    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            updateLanguage(lang);
        });
    });

    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const username = usernameInput.value;
        const password = passwordInput.value;

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, lang: currentLang }),
            });

            const data = await response.json();

            if (response.ok) {
                // Salva il token e la lingua
                localStorage.setItem('token', data.token);
                localStorage.setItem('lang', currentLang);
                localStorage.setItem('username', data.username);
                localStorage.setItem('role', data.role);
                
                // Reindirizza alla pagina home
                window.location.href = '/home.html';
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error('Errore durante il login:', error);
            alert('Si è verificato un errore durante il login. Riprova più tardi.');
        }
    });

    // Imposta la lingua iniziale
    updateLanguage(currentLang);
});
