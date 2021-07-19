const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Model = Sequelize.Model
class Admin extends Model {
    static async getUserbyEmail(email) {
        return await this.findOne({ where: { email: email } });
    }
}

Admin.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: { type: Sequelize.STRING(50), allowNull: false },
    email: { type: Sequelize.STRING(50), allowNull: false },
    password: { type: Sequelize.STRING(100), allowNull: false }
}, {
    sequelize,
    modelName: 'Admin',
    tableName: 'admins',
    timestamps: true
});

module.exports = Admin;