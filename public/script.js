// Função para o menu hambúrguer, já existente
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    const navLinkFade = 'navLinkFade'; // Corrige erro: define variável para animação

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `${navLinkFade} 0.5s ease forwards ${index / 7 + 0.3}s`;
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
function renderHome() {
    document.getElementById('conteudo').innerHTML = `
        <section class="destaques">
            <h2>Empresas em destaque</h2>
            <div class="cards" id="empresasDestaque"></div>
        </section>
        <section class="projetos">
            <h2>Projetos recentes</h2>
            <div class="cards" id="projetosRecentes"></div>
        </section>
        <aside class="eventos">
            <h2>Eventos próximos</h2>
            <ul id="eventosProximos"></ul>
        </aside>
    `;
    renderEmpresas();
    renderProjetos();
    renderEventos();
}
function renderExplorar() {
    document.getElementById('conteudo').innerHTML = `
        <section class="explorar">
            <h2>Explorar Empresas</h2>
            <input type="text" id="buscaEmpresa" placeholder="Buscar por nome, setor, localização..." style="width:100%;padding:0.7rem;margin-bottom:1rem;">
            <div class="cards" id="listaEmpresas"></div>
        </section>
    `;
    renderListaEmpresas(empresas);
    document.getElementById('buscaEmpresa').addEventListener('input', function() {
        const termo = this.value.toLowerCase();
        const filtradas = empresas.filter(e => e.nome.toLowerCase().includes(termo) || e.setor.toLowerCase().includes(termo));
        renderListaEmpresas(filtradas);
    });
}
function renderListaEmpresas(lista) {
    document.getElementById('listaEmpresas').innerHTML = lista.length ? lista.map(e => `
        <div class="card">
            <div class="logo">${e.logo}</div>
            <div class="nome">${e.nome}</div>
            <div class="setor">${e.setor}</div>
            <div class="descricao">${e.descricao}</div>
            <button class="btn">Ver perfil</button>
        </div>
    `).join('') : '<div>Nenhuma empresa encontrada.</div>';
}
function renderProjetosPage() {
    document.getElementById('conteudo').innerHTML = `
        <section class="projetos">
            <h2>Projetos</h2>
            <div class="cards" id="listaProjetos"></div>
        </section>
    `;
    document.getElementById('listaProjetos').innerHTML = projetos.map(p => `
        <div class="card">
            <div class="nome">${p.nome}</div>
            <div class="setor">${p.empresa}</div>
            <div class="descricao">${p.descricao}</div>
            <div class="setor">Status: ${p.status}</div>
            <button class="btn">Ver projeto</button>
        </div>
    `).join('');
}
function renderNoticias() {
    document.getElementById('conteudo').innerHTML = `
        <section class="noticias">
            <h2>Notícias</h2>
            <div class="cards">
                <div class="card"><div class="nome">TechHub lança nova plataforma B2B</div><div class="descricao">Solução para integração de empresas.</div></div>
                <div class="card"><div class="nome">AgroMais participa da Feira Agro 2025</div><div class="descricao">Evento reúne líderes do setor.</div></div>
                <div class="card"><div class="nome">ConstruaJá fecha parceria internacional</div><div class="descricao">Expansão para América Latina.</div></div>
            </div>
        </section>
    `;
}
function renderEventosPage() {
    document.getElementById('conteudo').innerHTML = `
        <section class="eventos">
            <h2>Eventos</h2>
            <ul>
                ${eventos.map(ev => `<li><span class="data">${ev.data}</span> <span>${ev.nome}</span> <span>${ev.local}</span></li>`).join('')}
            </ul>
        </section>
    `;
}
function renderPerfilEmpresa(empresa) {
    document.getElementById('conteudo').innerHTML = `
        <section class="perfil">
            <div class="logo" style="font-size:3rem;width:80px;height:80px;margin-bottom:1rem;">${empresa.logo}</div>
            <h2>${empresa.nome}</h2>
            <div class="setor">${empresa.setor}</div>
            <div class="descricao">${empresa.descricao}</div>
            <hr style="margin:1.2rem 0;">
            <h3>Projetos</h3>
            <ul>
                ${projetos.filter(p => p.empresa === empresa.nome).map(p => `<li>${p.nome} — ${p.status}</li>`).join('') || '<li>Nenhum projeto cadastrado.</li>'}
            </ul>
            <h3>Clientes/Portfólio</h3>
            <ul><li>Exemplo: Empresa X</li><li>Empresa Y</li></ul>
            <h3>Localização</h3>
            <div style="background:#e0e7ef;padding:1rem;border-radius:8px;">Mapa (simulado)</div>
            <button class="btn" style="margin-top:1rem;">Entrar em contato</button>
        </section>
    `;
}
function renderSobre() {
    document.getElementById('conteudo').innerHTML = `
        <section class="sobre">
            <h2>Sobre o Negocie+</h2>
            <p>Negocie+ é uma rede para empresas que querem crescer juntas. Conecte, compartilhe projetos e expanda seus negócios com parcerias B2B.</p>
        </section>
    `;
}
function renderAjuda() {
    document.getElementById('conteudo').innerHTML = `
        <section class="ajuda">
            <h2>Central de Ajuda</h2>
            <p>Precisa de suporte? Envie uma mensagem pelo formulário de contato ou acesse nossa FAQ.</p>
        </section>
    `;
}
function renderPrivacidade() {
    document.getElementById('conteudo').innerHTML = `
        <section class="privacidade">
            <h2>Política de Privacidade</h2>
            <p>Seus dados são protegidos e usados apenas para fins de networking empresarial. Veja detalhes em nossa política.</p>
        </section>
    `;
}
function renderContato() {
    document.getElementById('conteudo').innerHTML = `
        <section class="contato">
            <h2>Contato</h2>
            <form id="formContato">
                <input type="text" placeholder="Nome da empresa" required style="width:100%;margin-bottom:1rem;padding:0.7rem;">
                <input type="email" placeholder="Email" required style="width:100%;margin-bottom:1rem;padding:0.7rem;">
                <textarea placeholder="Mensagem" required style="width:100%;margin-bottom:1rem;padding:0.7rem;"></textarea>
                <button class="btn" type="submit">Enviar</button>
            </form>
            <div style="margin-top:1rem;">
                <a href="#" style="margin-right:1rem;">LinkedIn</a>
                <a href="#">Instagram</a>
                <a href="#">WhatsApp</a>
            </div>
        </section>
    `;
    document.getElementById('formContato').onsubmit = function(e) {
        e.preventDefault();
        alert('Mensagem enviada! (simulação)');
        this.reset();
    };
}
function navegar(hash) {
    if(hash.startsWith('#perfil-')) {
        const nome = decodeURIComponent(hash.replace('#perfil-',''));
        const empresa = empresas.find(e => e.nome === nome);
        if(empresa) return renderPerfilEmpresa(empresa);
        return document.getElementById('conteudo').innerHTML = '<section><h2>Empresa não encontrada.</h2></section>';
    }
    switch(hash) {
        case '#explorar': renderExplorar(); break;
        case '#projetos': renderProjetosPage(); break;
        case '#noticias': renderNoticias(); break;
        case '#eventos': renderEventosPage(); break;
        case '#contato': renderContato(); break;
        case '#sobre': renderSobre(); break;
        case '#ajuda': renderAjuda(); break;
        case '#privacidade': renderPrivacidade(); break;
        default: renderHome();
    }
}
navLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        navegar(link.getAttribute('href'));
    });
});
document.querySelector('.footer').addEventListener('click', function(e) {
    if(e.target.tagName === 'A') {
        e.preventDefault();
        navegar(e.target.getAttribute('href'));
    }
});
// Adiciona evento para abrir perfil ao clicar em "Ver perfil"
function delegaPerfil() {
    document.getElementById('conteudo').addEventListener('click', function(e) {
        if(e.target.classList.contains('btn') && e.target.textContent === 'Ver perfil') {
            const nome = e.target.parentElement.querySelector('.nome').textContent;
            navegar('#perfil-' + encodeURIComponent(nome));
        }
    });
}
delegaPerfil();
navegar('#home');

// Inicializa as funções quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    navSlide();
    handleLogin();
    handleRegister();
});

function setUser(user) {
    localStorage.setItem('negocieUser', JSON.stringify(user));
    renderHeaderUser();
}
function getUser() {
    try {
        return JSON.parse(localStorage.getItem('negocieUser'));
    } catch { return null; }
}
function logout() {
    localStorage.removeItem('negocieUser');
    renderHeaderUser();
    navegar('#home');
}
function renderHeaderUser() {
    const user = getUser();
    const cta = document.querySelector('.cta');
    cta.innerHTML = user ? `
        <span style="margin-right:1rem;">Bem-vindo, <b>${user.nome || user.email}</b></span>
        <button id="logoutBtn">Sair</button>
    ` : `
        <button id="loginBtn">Entrar</button>
        <button id="cadastroBtn">Cadastrar Empresa</button>
    `;
    if(!user) {
        document.getElementById('loginBtn').onclick = () => showModal('login');
        document.getElementById('cadastroBtn').onclick = () => showModal('cadastro');
    } else {
        document.getElementById('logoutBtn').onclick = logout;
    }
}
// Modifica showModal para persistir login/cadastro e redirecionar
function showModal(tipo) {
    const modal = document.createElement('div');
    modal.className = 'modal-bg';
    modal.innerHTML = `
        <div class="modal">
            <button class="close" style="float:right;font-size:1.2rem;">&times;</button>
            <h2>${tipo === 'cadastro' ? 'Cadastrar Empresa' : 'Entrar'}</h2>
            <form id="form${tipo}">
                ${tipo === 'cadastro' ? `
                    <input type="text" name="nome" placeholder="Nome da empresa" required style="width:100%;margin-bottom:1rem;padding:0.7rem;">
                ` : ''}
                <input type="email" name="email" placeholder="Email" required style="width:100%;margin-bottom:1rem;padding:0.7rem;">
                <input type="password" name="senha" placeholder="Senha" required style="width:100%;margin-bottom:1rem;padding:0.7rem;">
                <button class="btn" type="submit">${tipo === 'cadastro' ? 'Cadastrar' : 'Entrar'}</button>
            </form>
            <div id="msg${tipo}" style="margin-top:1rem;color:#2563eb;"></div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.querySelector('.close').onclick = () => modal.remove();
    modal.onclick = e => { if(e.target === modal) modal.remove(); };
    const form = modal.querySelector('form');
    form.onsubmit = async function(e) {
        e.preventDefault();
        const dados = Object.fromEntries(new FormData(form));
        const url = tipo === 'cadastro' ? '/api/register' : '/api/login';
        try {
            const resp = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados)
            });
            const json = await resp.json();
            if(resp.ok) {
                modal.querySelector('#msg'+tipo).textContent = json.message;
                setUser(json.user);
                setTimeout(() => {
                    modal.remove();
                    navegar('#home');
                }, 1200);
            } else {
                modal.querySelector('#msg'+tipo).textContent = json.error || 'Erro ao processar.';
            }
        } catch {
            modal.querySelector('#msg'+tipo).textContent = 'Erro de conexão.';
        }
    };
}
// Estilo do modal
if(!document.getElementById('modalStyle')) {
    const style = document.createElement('style');
    style.id = 'modalStyle';
    style.innerHTML = `
    .modal-bg {position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.18);display:flex;align-items:center;justify-content:center;z-index:1000;}
    .modal {background:#fff;padding:2rem 1.5rem;border-radius:16px;box-shadow:0 4px 24px rgba(37,99,235,0.12);min-width:320px;max-width:90vw;position:relative;}
    .modal input {font-size:1rem;}
    .modal .btn {width:100%;margin-top:0.7rem;}
    .modal .close {background:none;border:none;cursor:pointer;}
    `;
    document.head.appendChild(style);
}
renderHeaderUser();