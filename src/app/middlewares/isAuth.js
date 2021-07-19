const jwt = require('jsonwebtoken');

module.exports = (request, response, next) => {
    const usertype = request.get('AuthorizationToken').split('#')[0];
    const token = request.get('AuthorizationToken').split("#")[1];
    let decodedToken;
    try {
        if (!['T', 'S'].includes(usertype) || !token)
            throw new Error('Invalid token');

        decodedToken = jwt.verify(token, (usertype == 'T' ? `${process.env.JWT_TUTOR_SECRET_KEY}` : `${process.env.JWT_STUDENT_SECRET_KEY}`));
    }
    catch (error) {
        error.statusCode = 500;
        decodedToken = null;
        throw error;
    }

    request.user = {
        userId: decodedToken.id,
        userName: decodedToken.name,
        userType: decodedToken.usertype
    }
    next();
};