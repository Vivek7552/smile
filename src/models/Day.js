const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const { Op } = require("sequelize");
const Model = Sequelize.Model
class Day extends Model {
    static async getAllDays(attributes) {
        return await this.findAll({ where:{id: { [Op.ne]: 8}},attributes });
    }
}

Day.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    day: { type: Sequelize.STRING(100), allowNull: false }
}, {
    sequelize,
    modelName: 'Day',
    tableName: 'days',
    timestamps: false
});

module.exports = Day;