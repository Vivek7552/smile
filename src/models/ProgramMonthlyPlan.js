const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Model = Sequelize.Model
class ProgramMonthlyPlan extends Model {
    static async createMonthlyPlan(planName, programId) {
        return await this.create({ name: planName, program_id: programId });
    }
    static async getPlansByProgramId(programId) {
        return await this.findAll({ where: { program_id: programId } });
    }
}

ProgramMonthlyPlan.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    program_id: { type: Sequelize.INTEGER, allowNull: false },
    name: { type: Sequelize.STRING(50), allowNull: false }
}, {
    sequelize,
    modelName: 'ProgramMonthlyPlan',
    tableName: 'program_monthly_plans',
    timestamps: true
});

module.exports = ProgramMonthlyPlan;