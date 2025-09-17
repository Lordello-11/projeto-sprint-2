// Importa os módulos necessários
const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const path = require('path');

// Cria uma instância do servidor Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para processar JSON e URLs
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conecta o servidor ao seu banco de dados PostgreSQL
const pool = new Pool({
    user: 'seu_usuario',
    host: 'seu_host',
    database: 'seu_banco',
    password: 'sua_senha',
    port: 5432, // Porta padrão do PostgreSQL
});

// Serve os arquivos estáticos (HTML, CSS, JS) da sua pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));


// --- Endpoint para o Cadastro de Novo Usuário ---
app.post('/api/register', async (req, res) => {
    const { nome, email, senha } = req.body;

    // Validação básica para garantir que os campos não estão vazios
    if (!nome || !email || !senha) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    try {
        // Gera um "hash" da senha para armazená-la de forma segura
        // O "salt" (10) define a complexidade da criptografia
        const saltRounds = 10;
        const senhaHash = await bcrypt.hash(senha, saltRounds);

        // Insere o novo usuário no banco de dados
        const result = await pool.query(
            'INSERT INTO usuarios (nome, email, senha_hash) VALUES ($1, $2, $3) RETURNING id, nome, email',
            [nome, email, senhaHash]
        );

        res.status(201).json({
            message: 'Usuário cadastrado com sucesso!',
            user: result.rows[0],
        });

    } catch (err) {
        // Se o erro for de e-mail duplicado (código '23505' no PostgreSQL)
        if (err.code === '23505') {
            return res.status(409).json({ error: 'Este e-mail já está em uso.' });
        }
        console.error('Erro no registro:', err);
        res.status(500).json({ error: 'Erro no servidor, por favor tente novamente mais tarde.' });
    }
});


// --- Endpoint para o Login de Usuário ---
app.post('/api/login', async (req, res) => {
    const { email, senha } = req.body;

    // Validação básica
    if (!email || !senha) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
    }

    try {
        // Busca o usuário no banco de dados pelo e-mail
        const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        const user = result.rows[0];

        // Se o usuário não for encontrado
        if (!user) {
            return res.status(401).json({ error: 'Credenciais inválidas.' });
        }

        // Compara a senha digitada com a senha criptografada do banco de dados
        const match = await bcrypt.compare(senha, user.senha_hash);

        if (!match) {
            return res.status(401).json({ error: 'Credenciais inválidas.' });
        }

        // Login bem-sucedido
        res.status(200).json({
            message: 'Login bem-sucedido!',
            user: {
                id: user.id,
                nome: user.nome,
                email: user.email
            }
        });

    } catch (err) {
        console.error('Erro no login:', err);
        res.status(500).json({ error: 'Erro no servidor, por favor tente novamente mais tarde.' });
    }
});

// Inicia o servidor e o faz "escutar" a porta especificada
app.listen(PORT, () => {
    console.log (Servidor, rodando em https://localhost:3000)
});