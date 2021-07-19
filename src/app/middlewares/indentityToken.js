module.exports = (request, response, next) => {
    let token = request.get('IdentityToken');
    let error = {};
    if (token !== process.env.API_IDENTITY_TOKEN) {
        error.statusCode = 500;
        error.message = "Indentity not verified";
        token = null;
        throw error;
    }
    next();
};