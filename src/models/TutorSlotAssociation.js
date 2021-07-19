const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Slot = require('../models/Slot')

const Model = Sequelize.Model
class TutorSlotAssociation extends Model {

    static async updateAssociationDetails(tutor_id, slots,day_id) {
        await this.destroy({ where: { tutor_id,
        day_id } });

        slots.forEach(async slot => {
            await this.create({ tutor_id, slot_id: slot, day_id });
        });
    
    }

}

TutorSlotAssociation.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    tutor_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    slot_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    day_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }

}, {
    sequelize,
    modelName: 'TutorSlotAssociation',
    tableName: 'tutor_slot_associations',
    timestamps: false
});


module.exports = TutorSlotAssociation;