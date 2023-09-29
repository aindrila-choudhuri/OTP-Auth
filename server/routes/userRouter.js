const router = require('express').Router();

const { signUp, verifyOtp, signIn } = require('../controllers/userController');

router.route('/signup').post(signUp);

router.route('/signup/verify').post(verifyOtp);

router.route('/signin').post(signIn);

router.route('/signin/verify').post(verifyOtp);

module.exports = router;
