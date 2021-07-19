const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Model = Sequelize.Model
class Dialect extends Model {

}

Dialect.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: { type: Sequelize.STRING(100), allowNull: false }
}, {
    sequelize,
    modelName: 'Dialect',
    tableName: 'dialects',
    timestamps: false
});

module.exports = Dialect;