const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const ProgramTask = require('./ProgramTask');

const Model = Sequelize.Model
class ProgramSubtask extends Model {
    static async createNewSubTask(taskObj) {
        return await this.create(taskObj);
    }
    static async removeRecords(conditions) {
        return await this.destroy(conditions);
    }
}

ProgramSubtask.init({
    id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
    weekly_plan_id: { type: Sequelize.INTEGER, allowNull: false },
    day_id: { type: Sequelize.INTEGER, allowNull: false },
    task_id: { type: Sequelize.INTEGER, allowNull: false },
    subtask: { type: Sequelize.TEXT, allowNull: false },
    has_attachment: { type: Sequelize.TINYINT, allowNull: false },
    attachment_url: { type: Sequelize.STRING(10), allowNull: true }
}, {
    sequelize,
    modelName: 'ProgramSubtask',
    tableName: 'program_subtasks',
    timestamps: true
});

module.exports = ProgramSubtask;