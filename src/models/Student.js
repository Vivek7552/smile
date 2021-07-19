const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const StudentTutorAssociation = require('./StudentTutorAssociation');
const ZoomDetail = require('./ZoomDetail');

const Model = Sequelize.Model
class Student extends Model {
    static async createUser(userData, password) {
        return await this.create({
            first_name: userData.first_name,
            last_name: userData.last_name || '',
            email: userData.email,
            password: password
        });
    }
    static async verifyUser(email) {
        return await this.update({ verified: 1 }, { where: { email: email } });
    }
    static async getUserProfile(userId, attributes) {
        return await this.findOne({ where: { id: userId }, attributes: attributes });
    }
    static async findUserByEmail(email) {
        return this.findOne({ where: { email: email } });
    }
    static async updateUserDetails(userId, userDetailsToUpdate) {
        return await this.update(userDetailsToUpdate, { where: { id: userId } });
    }
    static async getFirebaseId(userId, attributes) {
        return await this.findOne({
            where: { id: userId },
            attributes: attributes
        });
    }
    static async getZoomDetails(userId) {
        return await this.findOne({
            where: { id: userId },
            include: [{ model: ZoomDetail, attributes: ['access_token', 'refresh_token'], required: false }]
        });
    }
}

Student.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    first_name: { type: Sequelize.STRING(150), allowNull: true },
    last_name: { type: Sequelize.STRING(150), allowNull: true },
    email: { type: Sequelize.STRING(200), allowNull: false },
    password: { type: Sequelize.STRING(50), allowNull: false },
    level: { type: Sequelize.STRING(50), allowNull: true },
    firebase_uid: { type: Sequelize.STRING(200), allowNull: true },
    profile_image: { type: Sequelize.STRING(100), allowNull: true },
    tutor_preference: { type: Sequelize.STRING(10), allowNull: true },
    verified: { type: Sequelize.TINYINT, allowNull: true },
    onboarding: { type: Sequelize.TINYINT, allowNull: true },
    login_count: { type: Sequelize.INTEGER, allowNull: false,defaultValue: 0 },
    last_login: { type: Sequelize.DATE, allowNull: true }
}, {
    sequelize,
    modelName: 'Student',
    tableName: 'students',
    timestamps: true
});
Student.belongsTo(ZoomDetail, { foreignKey: 'id', targetKey: 'id' });
module.exports = Student