const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const { Op } = require("sequelize");

const Model = Sequelize.Model
class RegistrationOtp extends Model {
    static async saveOtp(email, otp, usertype) {
        return await this.create({ email: email, otp: otp, usertype: usertype, expiry: new Date(new Date().getTime() + 10 * 60000) });
    }
    static async checkValidity(email, otp) {
        return await this.findOne({ where: { email: email, otp: otp, expiry: { [Op.gte]: new Date() } } });
    }
}

RegistrationOtp.init({
    id: {
        type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true
    },
    email: { type: Sequelize.STRING(255), allowNull: false },
    otp: { type: Sequelize.STRING(255), allowNull: false },
    usertype: { type: Sequelize.CHAR, allowNull: false },
    expiry: { type: Sequelize.DATE, allowNull: false },
}, {
    sequelize,
    modelName: 'RegistrationOtp',
    tableName: 'registration_otps',
    timestamps: false
});

module.exports = RegistrationOtp