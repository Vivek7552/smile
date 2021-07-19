const StoredProcedure = require('../../../utils/storedProcedure');
const responseHandler = require('../../../utils/responderHandler');
const ChatPartnersResponse = require('../../../resources/chatPartnersResponse');
const AudioLibraryService = require('../../../services/AudioLibraryService');
const AudioLibraryResponse = require('../../../resources/audioLibraryResponse');

exports.getChatPartners = async (request, response, next) => {
    let users;
    switch (request.user.userType) {
        case 'TUTOR':
            users = await getStudents(request.user.userId);
            break;
        case 'STUDENT':
            users = await getTutor(request.user.userId)
            break;
    }

    return responseHandler(request, response, next, true, 2016, ChatPartnersResponse.collection(users));
}

let getStudents = async tutorId => {
    let users = await StoredProcedure('Tutor_getAllStudents(:tutor_id)', {
        tutor_id: tutorId
    });
    return users;
}

let getTutor = async studentId => {
    let user = await StoredProcedure('Student_getMyTutor(:student_id)', {
        student_id: studentId
    });
    return user;
}

exports.addAudio = async (request, response, next) => {
    const data = {
        user_id: request.user.userId,
        custom_name: request.body.custom_name,
        audio_link: request.body.audio_link,
        duration:request.body.duration
    }
    const audioFound = await AudioLibraryService.findByAudioLink(request.user.userId,request.body.audio_link)

    if(audioFound)
    return responseHandler(request, response, next, true, 2031, {});

    await AudioLibraryService.addToLibrary(data);
    return responseHandler(request, response, next, true, 2023, {});

}

exports.getAudios = async (request, response, next) => {

    const user_id = request.user.userId;
    recordings = await AudioLibraryService.getAllAudios(user_id);
    return responseHandler(request, response, next, true, 2024, AudioLibraryResponse.collection(recordings));

}


exports.updateAudioDetails = async (request, response, next) => {
    const data = {
        custom_name: request.body.custom_name,
        id: request.body.id
    }
    const audioExists = await  AudioLibraryService.findAudioById(data.id)
    if(!audioExists)
    return responseHandler(request, response, next, true, 1011, {});
    
       await AudioLibraryService.updateAudio(data);
    return responseHandler(request, response, next, true, 2025, {custom_name:data.custom_name});

}

exports.removeAudioDetails = async (request, response, next) => {
    const audio_id = request.params.id
   const audioExists = await  AudioLibraryService.findAudioById(audio_id)
   if(!audioExists)
   return responseHandler(request, response, next, true, 1011, {});

       await AudioLibraryService.deleteAudio(audio_id);
    return responseHandler(request, response, next, true, 2026, {});

}
