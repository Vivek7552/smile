const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Model = Sequelize.Model
class ProgramWeeklyPlan extends Model {
    static async createWeeklyPlan(planName, programId, monthlyPlanId) {
        return await this.create({ name: planName, program_id: programId, monthly_plan_id: monthlyPlanId });
    }
    static async getPlansByMonthlyPlanId(monthlyPlanId) {
        return await this.findAll({ where: { monthly_plan_id: monthlyPlanId } });
    }
}

ProgramWeeklyPlan.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    program_id: { type: Sequelize.INTEGER, allowNull: false },
    monthly_plan_id: { type: Sequelize.INTEGER, allowNull: false },
    name: { type: Sequelize.STRING(50), allowNull: false }
}, {
    sequelize,
    modelName: 'ProgramWeeklyPlan',
    tableName: 'program_weekly_plans',
    timestamps: true
});

module.exports = ProgramWeeklyPlan;