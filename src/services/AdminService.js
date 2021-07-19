const Admin = require('../models/Admin');

exports.getUserbyEmail = email => {
    return Admin.getUserbyEmail(email);
}