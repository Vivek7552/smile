const router = require('express').Router();
const cors = require('cors');
const isAuth = require('../middlewares/isAuth');
const indentityToken = require('../middlewares/indentityToken');
const logger = require('../../utils/loggingEngine');
const validations = require('../middlewares/validations');
const fileUpload = require('../../utils/fileUpload');
const singleFileUpload = fileUpload.single('image');
router.use(cors());

// Require Controllers
const authController = require('../controllers/Api/AuthController');
const profileController = require('../controllers/Api/ProfileController');
const paymentController = require('../controllers/Api/PaymentController');
const generalController = require('../controllers/Api/GeneralController');
const chatController = require('../controllers/Api/ChatController');
const schedulingController = require('../controllers/Api/SchedulingController');


// Auth routes for teacher and student
router.post('/register', indentityToken, logger, validations.registerRules(), validations.validate, authController.register);
router.post('/login', indentityToken, logger, validations.loginRules(), validations.validate, authController.login);
router.post('/verify-otp', indentityToken, logger, validations.otpVerificationsRules(), validations.validate, authController.verifyOtp);
router.post('/tutor-onboarding', isAuth, logger, validations.tutorOnboardingRules(), validations.validate, authController.tutorOnboarding);
router.post('/student-onboarding', isAuth, logger, validations.studentOnboardingRules(), validations.validate, authController.studentOnboarding);
// Profile routes
router.get('/get-profile', isAuth, logger, profileController.getProfile);
router.get('/get-master-data', isAuth, logger, generalController.getMasterData);
router.post('/update-profile-image', isAuth, singleFileUpload, logger, profileController.uploadProfileImage);
router.put('/update-student-profile', isAuth, logger, validations.studentProfileUpdateRules(), validations.validate, profileController.updateStudentProfile);
router.put('/update-tutor-profile', isAuth, logger, validations.tutorProfileUpdateRules(), validations.validate, profileController.updateTutorProfile);

router.get('/get-payment-plans', isAuth, paymentController.getPaymentPlans);


// Chat apis
router.get('/get-chat-partners', isAuth, chatController.getChatPartners);
router.post('/add-audio-to-library', isAuth, logger,validations.addAudioRules(), validations.validate,chatController.addAudio);
router.get('/get-audio-recordings', isAuth, logger,chatController.getAudios);
router.put('/update-audio-details', isAuth, logger,validations.updateAudioRules(), validations.validate,chatController.updateAudioDetails);
router.delete('/remove-audio-recording/:id', isAuth, logger,chatController.removeAudioDetails);


//scheduling routes
router.get('/get-all-slots', isAuth,logger, schedulingController.getSlots);
router.post('/update-slots', isAuth, logger,schedulingController.updateSlots);

//scheduling routes for student
router.get('/get-available-slots', isAuth, logger,schedulingController.getAvailableSlots);



//testimonials
router.get('/get-testimonials', generalController.getAllTestimonials);

//zoom api integration
router.get('/callback', schedulingController.authorizeZoom);
router.post('/schedule-class', isAuth,logger,validations.scheduleClassRules(), validations.validate,schedulingController.createMeeting);
router.get('/student-meeting-list', isAuth,logger,schedulingController.studentMeetingList);
router.get('/tutor-meeting-list', isAuth,logger,schedulingController.tutorMeetingList);
router.get('/deauthorization', (request, response) => {
    console.log("ZOOM DEOAUTH QUERY", request.query);
    console.log('DEAUTHORIZATION')
    response.send({
        message: 'revoked'
    })
});

module.exports = router;