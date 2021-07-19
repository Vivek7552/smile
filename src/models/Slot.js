const Sequelize = require('sequelize');
const sequelize = require('../config/database');


const Model = Sequelize.Model
class Slot extends Model {
    static async getAllSlots(attributes) {
        attributes = attributes.length ? attributes = {
            attributes: attributes,
            raw: true
        } : {};
        return await this.findAll(attributes);
    }

    static async getSlot(id) {
        return await this.findOne({where:{id},attributes:['start_time']});
    }
}

Slot.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    start_time: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    end_time: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'Slot',
    tableName: 'slots',
    timestamps: true
});


module.exports = Slot