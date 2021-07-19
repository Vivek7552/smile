const bcrypt = require('bcryptjs');
const AdminService = require('../../../services/AdminService');

exports.loginPage = (request, response, next) => {
    response.render('login');
}

exports.login = async (request, response, next) => {
    let admin = await AdminService.getUserbyEmail(request.body.email);

    if (!admin) response.redirect('/');

    let correctPassword = await bcrypt.compare(request.body.password, admin.password);

    if (!correctPassword) response.redirect('/');

    request.session.isLoggedIn = true;
    request.session.user = { id: admin.id, name: admin.name, email: admin.email };

    response.redirect('/dashboard');
}

exports.logout = async (request, response, next) => {
    if (request.session.isLoggedIn)
        request.session.destroy();

    response.redirect('/');
}