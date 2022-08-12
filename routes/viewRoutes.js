const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

// Pug
router.get('/', viewsController.getOverview);
router.get('/tour/:slug', viewsController.getTour);
// /login route, create controller, then template
router.get('/login', viewsController.getLoginForm);
router.get('/signup', viewsController.getSignupForm);
router.get('/me', viewsController.getAccount);


module.exports = router;