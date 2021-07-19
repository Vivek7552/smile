const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Dialect = require('./Dialect');

const Model = Sequelize.Model
class TutorDialect extends Model {
    static async updateDialects(userId, dialects) {
        await this.destroy({ where: { tutor_id: userId } });
        dialects.forEach(async dialect => {
            await this.create({ tutor_id: userId, dialect_id: dialect });
        });
    }
    static async getTutorDialects(tutorId) {
        return await this.findAll({
            where: { tutor_id: tutorId },
            include: [{ model: Dialect, attributes: ['id', 'name'], required: false }]
        });
    }
}

TutorDialect.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    tutor_id: { type: Sequelize.INTEGER, allowNull: false },
    dialect_id: { type: Sequelize.INTEGER, allowNull: false }
}, {
    sequelize,
    modelName: 'TutorDialect',
    tableName: 'tutor_dialects',
    timestamps: false
});

TutorDialect.belongsTo(Dialect, { foreignKey: 'dialect_id', targetKey: 'id' });
module.exports = TutorDialect;