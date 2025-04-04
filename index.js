import express from "express";
import rotaCandidato from "./Routes/rotaCandidato.js";
import autenticar from './security/autenticar.js';
import session from 'express-session';

const host = "localhost";
const porta = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'meuSegredo', // Chave secreta para assinar o cookie da sessão
    resave: false, // Não salva a sessão no armazenamento
    saveUninitialized: false, // Não salva sessões não inicializadas
    cookie: {
        maxAge: 1000 * 60 * 30 // Duração do cookie (30 Minutos)
    }
}))

app.get('/login', (req, res) => {
    res.redirect('./login-form/index.html');
});
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log('Erro ao destruir a sessão:', err);
            res.redirect('/home'); // Redireciona para a página inicial em caso de erro
        } else {
            res.redirect('/home'); // Redireciona para a página inicial após logout
        }});
    }
);
app.post('/login', (req, res) => {
    const usuario = req.body.usuario;
    const senha = req.body.senha;
    if (usuario === 'admin' && senha === 'admin') {
        req.session.autenticado = true; // Define a sessão como autenticada
        res.redirect('/home-logged/index.html'); // Redireciona para a área logada
    } else {
        res.redirect('/login-form/index.html'); // Redireciona para a página de login
    }
});

app.use(express.static('./public'));
app.get('/home', (req, res) => {
    res.redirect('./home/index.html'); // Redireciona para a página inicial
});

app.use(autenticar, express.static('./private')); // Middleware de autenticação

app.use("/candidatos", rotaCandidato);

app.listen(porta, host, () => {
    console.log(`Servidor rodando em: http://${host}:${porta}`)
})