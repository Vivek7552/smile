const StudentService = require('../../../services/StudentService');
const TutorService = require('../../../services/TutorService');
const StudentProfileResponse = require('../../../resources/studentProfileResponse');
const TutorProfileResponse = require('../../../resources/tutorProfileResponse');
const responseHandler = require('../../../utils/responderHandler');
const firebase = require('../../../utils/firebase');

exports.getProfile = async (request, response, next) => {
    try {
        let user = null;
        if (request.user.userType === "TUTOR")
            user = new TutorProfileResponse(await TutorService.getProfile(request.user.userId)).exec();
        else
            user = new StudentProfileResponse(await StudentService.getProfile(request.user.userId)).exec();

        if (!user)
            return responseHandler(request, response, next, true, 2013, {});

        return responseHandler(request, response, next, true, 2012, user);
    } catch (error) {
        next(error);
    }
}

exports.uploadProfileImage = async (request, response, next) => {
    try {
        if (request.file == undefined)
            return responseHandler(request, response, next, true, 2014, {});

        let imageurl = `${process.env.CLOUDFRONT_URL}/${request.file.key}`;
        const user = request.user;
        let firebaseDetails
        if (user.userType == 'TUTOR') {
            firebaseDetails = await TutorService.getFirebaseDetails(user.userId);

            TutorService.updateUser({
                profile_image: imageurl
            }, user.userId);
        } else if (user.userType == 'STUDENT') {
            firebaseDetails = await StudentService.getFirebaseDetails(user.userId);

            StudentService.updateUser({
                profile_image: imageurl
            }, user.userId);
        }
        await firebase.updateUserInFirestore(firebaseDetails.firebase_uid, imageurl);
        return responseHandler(request, response, next, true, 2015, {
            profile_image: imageurl
        });
    } catch (error) {
        console.log(error)
    }
}


exports.updateStudentProfile = async (request, response, next) => {
    const user = request.user;

    StudentService.updateStudentProfileDetails({
        first_name,
        last_name,
        tutor_preference,
    } = request.body, user.userId);
    const firebaseDetails = await StudentService.getFirebaseDetails(user.userId);
    await firebase.updateUsernameInFirestore(firebaseDetails.firebase_uid,first_name,last_name);
    return responseHandler(request, response, next, true, 2017, {});
}

exports.updateTutorProfile = async (request, response, next) => {
    const user = request.user;
    request.body.gender = request.body.gender.toUpperCase()
    TutorService.updateTutorProfileDetails({
        first_name,
        last_name,
        address,
        date_of_birth,
        gender,
        contact,
        studied_formally,
        dialects,
        state_of_origin
    } = request.body, user.userId);

    const firebaseDetails = await TutorService.getFirebaseDetails(user.userId);
    await firebase.updateUsernameInFirestore(firebaseDetails.firebase_uid,first_name,last_name);
    return responseHandler(request, response, next, true, 2018, {});
}