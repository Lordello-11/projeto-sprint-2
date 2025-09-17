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

// Dados fictícios para protótipo
const empresas = [
    { nome: 'TechHub', setor: 'TI', descricao: 'Soluções inovadoras para empresas.', logo: 'T' },
    { nome: 'AgroMais', setor: 'Agronegócio', descricao: 'Conectando produtores e compradores.', logo: 'A' },
    { nome: 'ConstruaJá', setor: 'Construção', descricao: 'Projetos de engenharia e arquitetura.', logo: 'C' },
];
const projetos = [
    { nome: 'Plataforma B2B', empresa: 'TechHub', descricao: 'Marketplace para empresas.', status: 'Em andamento' },
    { nome: 'Feira Agro 2025', empresa: 'AgroMais', descricao: 'Evento anual do setor.', status: 'Concluído' },
    { nome: 'App Obras', empresa: 'ConstruaJá', descricao: 'Gestão de obras em tempo real.', status: 'Em andamento' },
];
const eventos = [
    { nome: 'Rodada de Negócios', data: '25/09/2025', local: 'São Paulo' },
    { nome: 'Workshop Inovação', data: '10/10/2025', local: 'Online' },
    { nome: 'Feira Agro', data: '05/11/2025', local: 'Ribeirão Preto' },
];

function renderEmpresas() {
    const el = document.getElementById('empresasDestaque');
    el.innerHTML = empresas.map(e => `
        <div class="card">
            <div class="logo">${e.logo}</div>
            <div class="nome">${e.nome}</div>
            <div class="setor">${e.setor}</div>
            <div class="descricao">${e.descricao}</div>
            <button class="btn">Ver perfil</button>
        </div>
    `).join('');
}
function renderProjetos() {
    const el = document.getElementById('projetosRecentes');
    el.innerHTML = projetos.map(p => `
        <div class="card">
            <div class="nome">${p.nome}</div>
            <div class="setor">${p.empresa}</div>
            <div class="descricao">${p.descricao}</div>
            <div class="setor">Status: ${p.status}</div>
            <button class="btn">Ver projeto</button>
        </div>
    `).join('');
}
function renderEventos() {
    const el = document.getElementById('eventosProximos');
    el.innerHTML = eventos.map(ev => `
        <li>
            <span class="data">${ev.data}</span>
            <span>${ev.nome}</span>
            <span>${ev.local}</span>
        </li>
    `).join('');
}
renderEmpresas();
renderProjetos();
renderEventos();

// Navegação fake para protótipo
const navLinks = document.querySelectorAll('.nav a');
navLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        // Aqui você pode implementar navegação SPA ou carregar outras páginas
        alert('Protótipo: navegação para ' + link.textContent);
    });
});

// Inicializa as funções quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    navSlide();
    handleLogin();
    handleRegister();
});