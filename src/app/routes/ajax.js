const router = require('express').Router();
const auth = require('../middlewares/webAuth');

const userController = require('../controllers/Admin/UserController');

router.get('/get-tutor', auth, userController.getTutor);

module.exports = router;