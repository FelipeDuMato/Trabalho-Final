import express from 'express';
import autenticar from './security/autenticar.js';
import session from 'express-session';

const porta = 3000;
const localhost = 'localhost';


const app = express();

app.use(express.urlencoded({ extended: true })); // Middleware para analisar dados de formulários

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

app.use(express.static('./public')); //Início
app.use(autenticar, express.static('./private')); // Middleware de autenticação

app.listen(porta, localhost, () => {
    console.log(`Servidor rodando em http://${localhost}:${porta}`);
  });