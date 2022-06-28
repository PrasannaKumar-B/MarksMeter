const express = require('express');
const controller = require('../controllers/userController');

const router = express.Router();

//POST /users: create a new user account
router.post('/login', controller.login);

router.get('/profile',controller.dashboard);

router.get('/professor/profile',controller.professorProfile);

router.get('/logout',controller.logout)

router.get('/petition',controller.petition);

router.post('/petition',controller.postPetition);

router.post('/petition/accept/:id',controller.acceptPetition);

router.post('/petition/reject/:id',controller.rejectPetition);

module.exports = router;

