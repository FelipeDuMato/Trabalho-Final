export default function autenticar(req, res, next) {

    // Verifica se o usuário está autenticado
    if (req.session.autenticado === true) {
        next(); // Usuário autenticado, prossegue para a próxima rota
    } else {
        // Se não estiver autenticado, redireciona para a página de login
        res.redirect('/home');
    }
}