const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Model = Sequelize.Model
class Testimonial extends Model {
    static async getTestimonials(attributes) {
        return await this.findAll({ attributes });
    }
}

Testimonial.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: { type: Sequelize.STRING(100), allowNull: false },
    link: { type: Sequelize.STRING(200), allowNull: false },
}, {
    sequelize,
    modelName: 'Testimonial',
    tableName: 'testimonials',
    timestamps: false
});

module.exports = Testimonial;