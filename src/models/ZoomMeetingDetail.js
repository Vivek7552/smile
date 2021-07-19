const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Tutor = require('./Tutor');
const Student = require('./Student');

const Model = Sequelize.Model
class ZoomMeetingDetail extends Model {
    static async saveMeeting(data) {
        return await this.create(data);
    }

    static async findMeetings(tutor_id,day_id,meeting_date) {
        return await this.findAll({where:{
            tutor_id,day_id,meeting_date
        },
        attributes:['slot_id'],
        raw:true
    });
    }
}

ZoomMeetingDetail.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    student_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    tutor_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    meeting_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    start_url: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    join_url: {
        type: Sequelize.STRING,
        allowNull: true
    },
    slot_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    day_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    meeting_date:{
        type:Sequelize.DATEONLY,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'ZoomMeetingDetail',
    tableName: 'zoom_meeting_details',
    timestamps: false
});

module.exports = ZoomMeetingDetail;