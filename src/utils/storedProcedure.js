const { QueryTypes } = require('sequelize');
const sequelize = require('../config/database');


module.exports = async (SP, params) => {
    let result = await sequelize.query(`CALL ${SP};`, {
        replacements: params
    });
    return result;
}