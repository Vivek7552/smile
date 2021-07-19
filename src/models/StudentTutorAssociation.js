const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Tutor = require('./Tutor');
const Student = require('./Student');

const Model = Sequelize.Model
class StudentTutorAssociation extends Model {
    static async createAssociationDetails(student_id, tutor_id) {
        return await this.create({
            student_id,
            tutor_id
        });
    }
    static async updateAssociationDetails(student_id, tutor_id) {
        return await this.update({
            tutor_id
        },
        {
            where:{student_id}
        }
        );
    }

    static async findStudentById(student_id) {
        return await this.findOne({ where: { student_id } });
    }

    static async findAllocatedTutor(student_id) {
        return await this.findOne({ where: { student_id },attributes:['tutor_id'] });
    }
}

StudentTutorAssociation.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    student_id: { type: Sequelize.INTEGER, allowNull: false },
    tutor_id: { type: Sequelize.INTEGER, allowNull: false }
}, {
    sequelize,
    modelName: 'StudentTutorAssociation',
    tableName: 'student_tutor_associations',
    timestamps: false
});

module.exports = StudentTutorAssociation;