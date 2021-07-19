const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const StateOfOrigin = require('./StateOfOrigin');

const Model = Sequelize.Model
class Tutor extends Model {
    static async createUser(userData, password) {
        return await this.create({
            first_name: userData.first_name,
            last_name: userData.last_name || '',
            email: userData.email,
            password: password,
            rating: 0
        });
    }
    static async verifyUser(email) {
        return await this.update({ verified: 1 }, { where: { email: email } });
    }
    static async getUserProfile(userId, attributes) {
        return await this.findOne({
            where: { id: userId },
            attributes: attributes,
            include: [{ model: StateOfOrigin, attributes: ['id', 'name'], required: false }]
        });
    }
    static async findUserByEmail(email) {
        return await this.findOne({ where: { email: email } });
    }
    static async updateUserDetails(userId, userDetailsToUpdate) {
        return await this.update(userDetailsToUpdate, { where: { id: userId } });
    }
    static async getAlltutors(attributes) {
        attributes = attributes.length ? attributes = { attributes: attributes } : {};
        return await this.findAll(attributes);
    }
    static async getFirebaseId(userId, attributes) {
        return await this.findOne({
            where: { id: userId },
            attributes: attributes
        });
    }
}

Tutor.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    first_name: { type: Sequelize.STRING(255), allowNull: false },
    last_name: { type: Sequelize.STRING(255), allowNull: true },
    email: { type: Sequelize.STRING(255), allowNull: false },
    password: { type: Sequelize.STRING(255), allowNull: false },
    address: { type: Sequelize.STRING(255), allowNull: true },
    date_of_birth: { type: Sequelize.DATEONLY, allowNull: true },
    profile_image: { type: Sequelize.STRING(100), allowNull: true },
    gender: { type: Sequelize.STRING(10), allowNull: true },
    rating: { type: Sequelize.DECIMAL(10, 2), allowNull: true },
    contact: { type: Sequelize.STRING(50), allowNull: true },
    firebase_uid: { type: Sequelize.STRING(200), allowNull: true },
    state_of_origin: { type: Sequelize.INTEGER, allowNull: true },
    studied_formally: { type: Sequelize.TINYINT, allowNull: true },
    approved: { type: Sequelize.TINYINT, allowNull: true },
    verified: { type: Sequelize.TINYINT, allowNull: true },
    onboarding: { type: Sequelize.TINYINT, allowNull: true },
    login_count: { type: Sequelize.INTEGER, allowNull: false,defaultValue: 0 },
    last_login: { type: Sequelize.DATE, allowNull: true }
}, {
    sequelize,
    modelName: 'Tutor',
    tableName: 'tutors',
    timestamps: true
});

Tutor.belongsTo(StateOfOrigin, { foreignKey: 'state_of_origin', targetKey: 'id' });
module.exports = Tutor