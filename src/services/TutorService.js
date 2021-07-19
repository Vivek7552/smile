const Tutor = require('../models/Tutor');
const TutorDialect = require('../models/TutorDialect');
const bcrypt = require("bcryptjs");

exports.getUserByEmail = email => {
    return Tutor.findUserByEmail(email);
}

exports.createUser = async data => {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(data.password, salt);
    return Tutor.createUser(data, password);
}

exports.onboardUser = (data, userId) => {
    let updateDetails = {
        address: data.address,
        date_of_birth: data.date_of_birth,
        gender: data.gender.toUpperCase(),
        contact: data.contact,
        state_of_origin: data.state_of_origin,
        studied_formally: data.studied_formally ? 1 : 0,
        onboarding: 1
    };
    Tutor.updateUserDetails(userId, updateDetails);
    TutorDialect.updateDialects(userId, data.dialects);
}

exports.getProfile = async userId => {
    let attributes = ['id', 'first_name', 'last_name', 'email', 'gender','date_of_birth','address','rating', 'contact', 'studied_formally', 'state_of_origin','approved','profile_image'];
    let tutor = await Tutor.getUserProfile(userId, attributes);
    tutor.dialects = await TutorDialect.getTutorDialects(userId);
    return tutor;
}

exports.updateTutorVerificationStatus = email => {
    return Tutor.verifyUser(email);
}

exports.getAlltutors = async () => {
    return Tutor.getAlltutors([]);
}

exports.getTutorsForList = async () => {
    return Tutor.getAlltutors(['id', 'first_name', 'last_name']);
}

exports.updateUser = async (data, userId) => {
    let update = {
        profile_image: data.profile_image,
        approved: data.approved,
        firebase_uid: data.firebase_uid
    }
    Tutor.updateUserDetails(userId, update);
}

exports.approveTutor = async userId => {

}

exports.getFirebaseDetails =  userId => {
    let attributes = ['firebase_uid'];
    return  Tutor.getFirebaseId(userId, attributes);
}

exports.updateTutorProfileDetails = (data, userId) => {
        Tutor.updateUserDetails(userId, data);
        TutorDialect.updateDialects(userId, data.dialects);
}

exports.updateLoginDetails = (userId,data) => {
    console.log(data,userId)
    Tutor.updateUserDetails(userId, data);
}