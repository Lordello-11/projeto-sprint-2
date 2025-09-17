// Função para o menu hambúrguer, já existente
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });
}

// --- Nova lógica para o formulário de login ---
const handleLogin = () => {
    const loginForm = document.getElementById('loginForm');
    
    // Se o formulário de login existe na página
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Impede o recarregamento da página

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, senha: password }),
                });

                const data = await response.json();

                if (response.ok) { // Se a resposta for 200 (OK)
                    alert(data.message);
                    console.log('Login bem-sucedido:', data.user);
                    // Em um app real, você salvaria os dados do usuário e redirecionaria
                    // window.location.href = '/dashboard'; 
                } else {
                    alert('Erro: ' + data.error);
                    console.error('Erro de login:', data.error);
                }
            } catch (error) {
                console.error('Erro na requisição:', error);
                alert('Ocorreu um erro ao conectar com o servidor.');
            }
        });
    }
};

// Adiciona uma nova função para o formulário de cadastro, caso você o crie.
const handleRegister = () => {
    const registerForm = document.getElementById('registerForm');
    
    // Se você tiver um formulário de cadastro com o ID 'registerForm'
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ nome: name, email, senha: password }),
                });

                const data = await response.json();

                if (response.ok) {
                    alert(data.message);
                    console.log('Cadastro bem-sucedido:', data.user);
                } else {
                    alert('Erro no cadastro: ' + data.error);
                    console.error('Erro de cadastro:', data.error);
                }
            } catch (error) {
                console.error('Erro na requisição:', error);
                alert('Ocorreu um erro ao tentar se cadastrar.');
            }
        });
    }
};


// Inicializa as funções quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    navSlide();
    handleLogin();
    handleRegister();
});