const { body, validationResult } = require('express-validator');
const errorHandler = require('../../utils/errorHandler');

const validate = (request, response, next) => {
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            throw errorHandler.createError(1002);
        }
        next();
    }
    catch (error) {
        next(error);
    }
}

const registerRules = () => {
    return [
        body('first_name').not().isEmpty(),
        body('email').not().isEmpty().isEmail(),
        body('password').not().isEmpty().isLength({ min: 8 }),
        body('usertype').not().isEmpty()
    ];
}

const otpVerificationsRules = () => {
    return [
        body('email').not().isEmpty().isEmail(),
        body('otp').not().isEmpty()
    ];
}

const loginRules = () => {
    return [
        body('email').not().isEmpty().isEmail(),
        body('password').not().isEmpty().isLength({ min: 8 })
    ];
}

const tutorOnboardingRules = () => {
    return [
        body('address').not().isEmpty(),
        body('date_of_birth').not().isEmpty().isDate(),
        body('gender').not().isEmpty(),
        body('contact').not().isEmpty(),
        body('state_of_origin').not().isEmpty(),
        body('studied_formally').not().isEmpty(),
        body('dialects').not().isEmpty()
    ];
}

const studentOnboardingRules = () => {
    return [
        body('level').not().isEmpty(),
        body('tutor_preference').not().isEmpty()
    ];
}

const studentProfileUpdateRules = () => {
    return [
        body('first_name').not().isEmpty(),
        body('tutor_preference').not().isEmpty().isIn(['MALE', 'FEMALE','EITHER'])
    ];
}

const tutorProfileUpdateRules = () => {
    return [
        body('first_name').not().isEmpty(),
        body('address').not().isEmpty(),
        body('date_of_birth').not().isEmpty().isDate(),
        body('gender').not().isEmpty(),
        body('contact').not().isEmpty(),
        body('state_of_origin').not().isEmpty(),
        body('studied_formally').not().isEmpty(),
        body('dialects').not().isEmpty()
    ];
}
const addAudioRules = () => {
    return [
        body('custom_name').not().isEmpty(),
        body('audio_link').not().isEmpty(),
        body('duration').not().isEmpty()
    ];
}

const updateAudioRules = () => {
    return [
        body('custom_name').not().isEmpty(),
        body('id').not().isEmpty().isNumeric(),

    ];
}
const scheduleClassRules = () => {
    return [
        body('slot_id').not().isEmpty().isNumeric(),
        body('day_id').not().isEmpty().isNumeric(),
        body('meeting_date').not().isEmpty().isDate(),
    ];
}



module.exports = {
    registerRules,
    otpVerificationsRules,
    loginRules,
    tutorOnboardingRules,
    studentOnboardingRules,
    validate,
    studentProfileUpdateRules,
    tutorProfileUpdateRules,
    addAudioRules,
    updateAudioRules,
    scheduleClassRules
};