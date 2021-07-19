const router = require('express').Router();
const auth = require('../middlewares/webAuth');
const fileUpload = require('../../utils/fileUpload');
const singleFileUpload = fileUpload.single('file');

// Require Controllers
const authController = require('../controllers/Admin/AuthController');
const homeController = require('../controllers/Admin/HomeController');
const userController = require('../controllers/Admin/UserController');
const lmsController = require('../controllers/Admin/LMSController');

// Auth routes for admin
router.get('/', authController.loginPage);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

// Home routes for admin
router.get('/dashboard', auth, homeController.dashboard);
router.get('/students', auth, userController.students);
router.get('/tutors', auth, userController.tutors);
router.get('/approve-tutor/:id', auth, userController.approveTutor);
router.get('/assign-tutor', auth, userController.assignTutor);

// LMS

router.get('/programs', auth, lmsController.programs);
router.post('/add-program', auth, lmsController.addProgram);
router.get('/program/:program_id', auth, lmsController.programMonthlyPlans);
router.post('/add-program-monthly-plan', auth, lmsController.addMonthlyPlanToProgram);
router.get('/plans/:program_id/:plan_id', auth, lmsController.programWeeklyPlans);
router.post('/add-program-weekly-plan', auth, lmsController.addWeeklyPlanToProgram);
router.get('/week-plan/:weekly_plan_id', auth, lmsController.weekPlanning);
router.post('/upload-file', auth, singleFileUpload, lmsController.uploadFile);
router.post('/save-day-tasks', auth, lmsController.saveTaskForTheDay);

module.exports = router;