const Student = require('../models/Student');
const bcrypt = require("bcryptjs");
const StoredProcedure = require('../utils/storedProcedure');

exports.getUserByEmail = async email => {
    return Student.findUserByEmail(email);
}

exports.createUser = async data => {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(data.password, salt);
    return Student.createUser(data, password);
}

exports.onboardUser = (data, userId) => {
    let updateDetails = { level: data.level, tutor_preference: data.tutor_preference, onboarding: 1 };
    Student.updateUserDetails(userId, updateDetails);
}

exports.getProfile = userId => {
    let attributes = ['id', 'first_name', 'last_name', 'email', 'level', 'tutor_preference', 'profile_image'];
    return Student.getUserProfile(userId, attributes);
}

exports.updateStudentVerificationStatus = email => {
    return Student.verifyUser(email);
}

exports.getAllStudents = async () => {
    return await StoredProcedure('Student_getAllStudentDetails()', {});
}

exports.updateUser = async (data, userId) => {
    let update = {
        profile_image: data.profile_image,
        firebase_uid: data.firebase_uid
    }
    Student.updateUserDetails(userId, update);
}

exports.updateStudentProfileDetails = (data, userId) => {
    let updateDetails = { first_name,last_name, tutor_preference} = data;
    Student.updateUserDetails(userId, updateDetails);
}

exports.getFirebaseDetails =  userId => {
    let attributes = ['firebase_uid'];
    return  Student.getFirebaseId(userId, attributes);
}

exports.updateLoginDetails = (userId,data) => {
    console.log(data,userId)
    Student.updateUserDetails(userId, data);
}

exports.getZoomDetails = (userId) => {
    return Student.getZoomDetails(userId);
}