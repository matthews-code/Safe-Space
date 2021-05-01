const express = require("express");
const mainController = require('../controllers/mainController.js');
const profileController = require('../controllers/profileController.js');
const entryController = require('../controllers/entryController.js');
const userController = require('../controllers/userController.js');
const router = express();
const db = require('../models/db.js');


// GET
router.get('/', mainController.getLogin); //incase user tries to access this route
router.get('/login', mainController.getLogin);
router.get('/error', mainController.getError);
router.get('/mainpage', mainController.getMainPage);
router.get('/settings', mainController.getSettingsPage);
router.get('/image/:id', mainController.getPicture); //responsible for getting image
router.get('/editaccount', mainController.geteditProfileAccount);

router.get('/checksignup', profileController.checksignup);
router.get('/checklogin', profileController.checklogin);
router.get('/profile/:uName', profileController.getProfile);
router.get('/logout', profileController.getLogout);

router.get('/userprofile/:uName', userController.getUserProfile);


//POST // Creation
router.post('/signup', db.upload.any(), profileController.signup);
router.post('/editaccount', db.upload.any(),profileController.editAccount);
router.post('/login', profileController.login);

router.post('/createentry', db.upload.any(), entryController.createEntry);
router.post('/editentry', db.upload.any(),  entryController.editEntry);
router.post('/deleteentry', entryController.deleteEntry);

router.get('/searchresults', mainController.getSearch);

//PATCH // Editing

//PUT // Editing

//DELETE
router.get('/deleteaccount',profileController.deleteaccount);

module.exports = router; 