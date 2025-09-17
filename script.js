// Script para o menu hambúrguer
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
                link.style.animation = navLinkFade; 0.5s ease forwards ${index / 7 + 0.3}s;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });
}

// Script para o formulário de login (apenas front-end para este exemplo)
const handleLogin = () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Impede o recarregamento da página

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Aqui você enviaria os dados para o seu backend
            // Exemplo fictício de validação básica no front-end
            if (email === 'test@example.com' && password === 'password123') {
                alert('Login bem-sucedido! (Simulado)');
                // Em um app real, você redirecionaria o usuário
                // window.location.href = '/dashboard';
            } else {
                alert('Email ou senha incorretos. (Simulado)');
            }

            // Em um cenário real, você faria uma requisição AJAX (fetch ou XMLHttpRequest)
            /*
            fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Login bem-sucedido!');
                    window.location.href = '/dashboard';
                } else {
                    alert('Erro de login: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Erro:', error);
                alert('Ocorreu um erro ao tentar fazer login.');
            });
            */
        });
    }
}


// Inicializa as funções quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    navSlide();
    handleLogin();
});

// Carousel de Banners (JavaScript para controle mais avançado)
// Para este exemplo, a animação do carousel é puramente CSS.
// Se precisasse de botões de navegação ou controle dinâmico, o JS seria assim:
/*
let currentBannerIndex = 0;
const bannerItems = document.querySelectorAll('.banner-item');
const totalBanners = bannerItems.length;

function showBanner(index) {
    bannerItems.forEach((item, i) => {
        item.style.display = (i === index) ? 'block' : 'none';
    });
}

function nextBanner() {
    currentBannerIndex = (currentBannerIndex + 1) % totalBanners;
    showBanner(currentBannerIndex);
}

// Opcional: Para controlar com JS e não com CSS
// setInterval(nextBanner, 5000);
// showBanner(currentBannerIndex);
*/