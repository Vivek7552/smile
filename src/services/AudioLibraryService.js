const AudioLibrary = require('../models/AudioLibrary');


exports.addToLibrary = async data => {
    return AudioLibrary.saveAudio(data.user_id,data.custom_name,data.audio_link,data.duration);
}

exports.getAllAudios = async user_id => {
    const attributes = ['id','custom_name','audio_link','duration','createdAt']
    return AudioLibrary.getAllAudios(user_id,attributes);
}

exports.updateAudio = async data => {
    return AudioLibrary.updateAudio(data.custom_name,data.id);
}

exports.deleteAudio = async id => {
    return AudioLibrary.deleteAudio(id);
}



exports.findAudioById = async id => {
    return AudioLibrary.findById(id);
}


exports.findByAudioLink = async (user_id,audio_link) => {
    return AudioLibrary.findByAudioLink(user_id,audio_link);
}
