const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Model = Sequelize.Model
class ZoomDetail extends Model {
    static async createToken(data) {
        return await this.create(data);
    }
    static async updateToken(data, userId) {
        return await this.update(data, {
            where: {
                id: userId
            }
        });
    }
    static async findToken(userId) {
        return await this.findOne({
            where: {
                id: userId
            },
            attributes:['authorize']
        });
    }
}

ZoomDetail.init({
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    access_token: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    refresh_token: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    authorize: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 1
    },

}, {
    sequelize,
    modelName: 'ZoomDetail',
    tableName: 'zoom_details',
    timestamps: true
});


module.exports = ZoomDetail