const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const ProgramSubtask = require('./ProgramSubtask');

const Model = Sequelize.Model
class ProgramTask extends Model {
    static async createNewTask(taskObj) {
        return await this.create(taskObj);
    }
    static async removeRecords(conditions) {
        return await this.destroy(conditions);
    }
    static async getPlanDataForTheWeek(weekPlanId) {
        return await this.findAll({
            where: { weekly_plan_id: weekPlanId },
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [{ model: ProgramSubtask, attributes: { exclude: ['createdAt', 'updatedAt'] }, required: false }]
        });
    }
}

ProgramTask.init({
    id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
    weekly_plan_id: { type: Sequelize.INTEGER, allowNull: false },
    day_id: { type: Sequelize.INTEGER, allowNull: false },
    type: { type: Sequelize.STRING(10), allowNull: false },
    level: { type: Sequelize.STRING(10), allowNull: false },
    task: { type: Sequelize.TEXT, allowNull: false },
    has_attachment: { type: Sequelize.TINYINT, allowNull: false },
    attachment_type: { type: Sequelize.STRING(10), allowNull: true },
    attachment_url: { type: Sequelize.STRING(10), allowNull: true },
    has_subelements: { type: Sequelize.TINYINT, allowNull: false }
}, {
    sequelize,
    modelName: 'ProgramTask',
    tableName: 'program_tasks',
    timestamps: true
});

ProgramTask.hasMany(ProgramSubtask, { onDelete: 'cascade', hooks: true, foreignKey: { name: 'task_id', allowNull: false } });

module.exports = ProgramTask;