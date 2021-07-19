const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Model = Sequelize.Model
class PaymentPlan extends Model {
    static async getAllPaymentPlans() {
        return await this.findAll();
    }
}

PaymentPlan.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: { type: Sequelize.STRING(50), allowNull: false },
    benefits: { type: Sequelize.TEXT, allowNull: false }
}, {
    sequelize,
    modelName: 'PaymentPlan',
    tableName: 'payment_plans',
    timestamps: true
});

module.exports = PaymentPlan;