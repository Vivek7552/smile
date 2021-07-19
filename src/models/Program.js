const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Model = Sequelize.Model
class Program extends Model {
    static async createProgram(programName) {
        return await this.create({ name: programName });
    }
    static async getAllPrograms() {
        return await this.findAll({ attributes: ['id', 'name'] });
    }
}

Program.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: { type: Sequelize.STRING(50), allowNull: false }
}, {
    sequelize,
    modelName: 'Program',
    tableName: 'programs',
    timestamps: true
});

module.exports = Program;