const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mailer = require('../../../utils/mailer');
const firebase = require('../../../utils/firebase');
const StudentService = require('../../../services/StudentService');
const TutorService = require('../../../services/TutorService');
const responseHandler = require('../../../utils/responderHandler');
const RegistrationOtp = require('../../../models/RegistrationOtp');
const LoginResponse = require('../../../resources/loginResponse');
const ZoomDetailService = require('../../../services/ZoomDetailService');


exports.register = async (request, response, next) => {
    try {
        let userExists = await validateUserExistence(request.body);
        if (userExists)
            return responseHandler(request, response, next, true, 1001, {});

        let userCreated = await signupUser(request.body);
        if (!userCreated)
            return responseHandler(request, response, next, true, 1007, {});

        await generateOtpForUser(request.body.email, request.body.usertype);

        return responseHandler(request, response, next, true, 2001, {});
    } catch (error) {
        next(error);
    }
}

let validateUserExistence = async userDetails => {
    if (userDetails.usertype == 'TUTOR' && await TutorService.getUserByEmail(userDetails.email))
        return true;

    if (userDetails.usertype == 'STUDENT' && await StudentService.getUserByEmail(userDetails.email))
        return true;
}

let signupUser = async userDetails => {
    let user = null;
    let service = undefined;
    if (userDetails.usertype == 'TUTOR')
        service = TutorService;
    else
        service = StudentService;

    user = await service.createUser(userDetails);

    if (user) {
        let firebaseid = await firebase.createFirebaseUser(user);
        service.updateUser({
            firebase_uid: firebaseid
        }, user.id);
        return true;
    } else return false;
}

let generateOtpForUser = async (email, usertype) => {
    let otp = Math.floor(10000 + Math.random() * 90000);
    otp = 12345;
    const createdOtp = await RegistrationOtp.saveOtp(email, otp, usertype);
    mailer.sendMail('emailVerification.ejs', {
        otp: otp
    }, email, 'Verify your email');
}

exports.verifyOtp = async (request, response, next) => {
    try {
        const verified = await RegistrationOtp.checkValidity(request.body.email, request.body.otp);
        let user = null;
  
        if (!verified)
            return responseHandler(request, response, next, true, 1006, {});

        if (verified.usertype === 'TUTOR') {
            TutorService.updateTutorVerificationStatus(verified.email);
            user = await TutorService.getUserByEmail(verified.email);
        }

        if (verified.usertype === 'STUDENT') {
            StudentService.updateStudentVerificationStatus(verified.email);
            user = await StudentService.getUserByEmail(verified.email);
        }

        if (!user)
            return responseHandler(request, response, next, true, 1008, {});

        const payload = {
            id: user.id,
            user: user.first_name + ' ' + user.last_name,
            usertype: verified.usertype
        };
        token = verified.usertype == 'TUTOR' ? `T#${jwt.sign(payload, process.env.JWT_TUTOR_SECRET_KEY)}` : `S#${jwt.sign(payload, process.env.JWT_STUDENT_SECRET_KEY)}`;
        let firbaseAccessToken = await firebase.createFirebaseAccesstoken(user.firebase_uid);

        return responseHandler(request, response, next, true, 2010, new LoginResponse({
            token: token,
            user: user,
            type: verified.usertype,
            firbaseAccessToken: firbaseAccessToken
        }).exec());

    } catch (error) {
        next(error);
    }
}

exports.login = async (request, response, next) => {
    try {
        let login_count
        let user = await StudentService.getUserByEmail(request.body.email);
        let usertype
        let ifZoomAuthorized
        if (user) {
            login_count = user.login_count + 1
            usertype = 'STUDENT';
            ifZoomAuthorized = await ZoomDetailService.findAccessToken(user.id)
        } else {
            user = await TutorService.getUserByEmail(request.body.email);
            login_count = user.login_count + 1
            usertype = 'TUTOR';
        }

        if (!user)
            return responseHandler(request, response, next, true, 1000, {});

        if (!user.verified) {
            generateOtpForUser(request.body.email, usertype);
            return responseHandler(request, response, next, true, 1005, {});
        }

        const correctPassword = await bcrypt.compare(request.body.password, user.password);

        if (!correctPassword)
            return responseHandler(request, response, next, true, 1004, {});

        if (usertype == 'TUTOR' && !(user.approved))
            return responseHandler(request, response, next, true, 1009, {});

        if (usertype == 'TUTOR') {
            await TutorService.updateLoginDetails(user.id, {
                login_count,
                last_login: new Date()
            })
        } else {
            await StudentService.updateLoginDetails(user.id, {
                login_count,
                last_login: new Date()
            })
        }

        const payload = {
            id: user.id,
            user: user.first_name + ' ' + user.last_name,
            usertype: usertype
        };
        let firbaseAccessToken = await firebase.createFirebaseAccesstoken(user.firebase_uid);
        token = usertype == 'TUTOR' ? `T#${jwt.sign(payload, process.env.JWT_TUTOR_SECRET_KEY)}` : `S#${jwt.sign(payload, process.env.JWT_STUDENT_SECRET_KEY)}`
        return responseHandler(request, response, next, true, 2000, new LoginResponse({
            token: token,
            user: user,
            type: usertype,
            firbaseAccessToken: firbaseAccessToken,
            login_count,
            ifZoomAuthorized
        }).exec());

    } catch (error) {
        next(error);
    }
}

exports.tutorOnboarding = async (request, response, next) => {
    try {
        await TutorService.onboardUser(request.body, request.user.userId);

        return responseHandler(request, response, next, true, 2002, {});
    } catch (error) {
        next(error);
    }
}

exports.studentOnboarding = async (request, response, next) => {
    try {
        await StudentService.onboardUser(request.body, request.user.userId);

        return responseHandler(request, response, next, true, 2002, {});
    } catch (error) {
        next(error);
    }
}