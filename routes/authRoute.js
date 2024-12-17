const { Router } = require('express');

const authController = require('../controllers/authController');

const router = Router();
//User Requests
router.get('/signup', authController.signupGet);
router.post('/signup', authController.signupPost);
router.get('/login', authController.loginGet);
router.post('/login', authController.loginPost);
router.get('/logout', authController.logoutGet);

//Admin Requests
router.post('/adminSignup', authController.adminSignupPost)
router.get('/adminLogin', authController.adminLoginGet);
router.post('/adminLogin', authController.adminLoginPost);
router.delete('/adminDeleteUser', authController.adminDeleteUser)
router.put('/adminEditUser', authController.adminEditUser)
 

module.exports = router;
