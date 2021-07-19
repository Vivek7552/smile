const constants = require('../config/constants');

exports.invalidEndPoint = (request, response, next) => {
    const error = new Error('Invalid Endpoint!');
    error.statusCode = 404;
    throw error;
};

exports.createError = statusCode => {
    const error = new Error(constants.response_code[statusCode]);
    error.statusCode = statusCode;
    return error;
};

exports.makeErrorResponse = error => {
    const status = error.statusCode || 500;
    const message = error.message || 'Server Error';
    let response = { status: false, code: status, message: message, data: {} };
    return response;
};

exports.validate = (parameters, requestBody) => {
    response = false;
    parameters.forEach(param => {
        if (!(param in requestBody)) response = true;
    });
    return response;
};