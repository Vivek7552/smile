module.exports = (request, response, next) => {
    if (!request.session.isLoggedIn)
        return response.redirect('/');

    response.set('Content-Security-Policy', "default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'");
    next();
}