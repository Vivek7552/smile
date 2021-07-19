const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Model = Sequelize.Model
class AudioLibrary extends Model {
    static async saveAudio(user_id, custom_name, audio_link,duration) {
        return await this.create({
            user_id,
            custom_name,
            audio_link,
            duration
        });
    }

    static async getAllAudios(user_id, attributes) {
        return await this.findAll({
            where: {
                user_id
            },
            attributes
        });
    }

    static async updateAudio(custom_name,id) {
        return await this.update({custom_name}, {
            where: {
                id
            }
        });
    }

    

    static async deleteAudio(id) {
        return await this.destroy( {
            where: {
                id
            }
        });
    }

    static async findById(id) {
        return await this.findOne({
            where: {
                id
            }
        });
    }

    static async findByAudioLink(user_id,audio_link) {
        return await this.findOne({
            where: {
                user_id,
                audio_link
            }
        });
    }
    
}

AudioLibrary.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,

    },
    custom_name: {
        type: Sequelize.STRING(150),
        allowNull: false
    },
    audio_link: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    duration: {
        type: Sequelize.STRING(150),
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'AudioLibrary',
    tableName: 'audio_library',
    timestamps: true
});

module.exports = AudioLibrary