const express = require('express');
const controller = require('../controllers/courseController');

const router = express.Router();

router.get('/:id',controller.assignments);

router.get('/new/assignment',controller.newAssignment);

router.post('/assignment/new', controller.createAssignements);

router.post('/assignment/:id', controller.submitAssignment);

router.get('/grade/:id',controller.gradeAssignments);

router.post('/gradeassignment/:id',controller.postGrade)

module.exports = router;

