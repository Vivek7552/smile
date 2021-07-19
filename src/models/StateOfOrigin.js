const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Model = Sequelize.Model
class StateOfOrigin extends Model {

}

StateOfOrigin.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: { type: Sequelize.STRING(100), allowNull: false }
}, {
    sequelize,
    modelName: 'StateOfOrigin',
    tableName: 'states_of_origins',
    timestamps: false
});

module.exports = StateOfOrigin;