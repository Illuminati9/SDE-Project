const express = require('express');
const router = express.Router();

const { signUp, login, sendOTP, forgetPassword, changePassword } = require('../controllers/user.js');
const { auth } = require('../middleware/auth.js')

router.post('/sendOTP', sendOTP)
router.post('/signup', signUp);
router.post('/signin', login);
router.post('/forgetPassword', forgetPassword)
router.post('/changePassword', auth, changePassword)

module.exports = router;