const router = require('express').Router();
const auth = require('./middlewares/auth');
const usersController = require('./controllers/usersController');
const foodController = require('./controllers/foodsController');

// User routes
router.post('/users/register', usersController.register);
router.post('/users/login', usersController.login);
router.get('/users/profile', auth, usersController.profile);
router.post('/users/verify', usersController.verify);
router.post('/users/reset-password', usersController.resetPassword);
router.post('/users/reset-password-submit', usersController.resetPasswordSubmit);
router.post('/users/reset-password-verify', usersController.resetPasswordVerify);
//--User routes


// Food routes
router.get('/foods', foodController.findAll);
router.get('/foods/:id', foodController.findOne);
router.post('/foods', foodController.createFood);
router.put('/foods/:id', foodController.updateFood);
router.delete('/foods/:id', foodController.deleteFood);
//--Food routes

module.exports = router;