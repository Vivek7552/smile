const Constants = require('../config/constants');

module.exports = (request, response, next, status, messageCode, data) => {
    response.status(200).json({
        status: status,
        code: messageCode,
        message: Constants.response_code[messageCode],
        data: data
    });
};