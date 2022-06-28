const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AssignmentSchema = new Schema({
    courseRefId: {type: Schema.Types.ObjectId, ref:'Course', required: [true, 'Course Id is required']},
    courseId: {type: String, required: [true, 'Course Id is required']},
    semester: {type: String, required: [true, 'Semester Id is required']},
    assignmentName: {type: String, required: [true, 'Assignemnet name is required']},
    instructions: {type: String, required: [true, 'Instructions is required']},
    assignmentStatus : {type: String, required: [true, 'Status is required']},
});

module.exports = mongoose.model('Assignment', AssignmentSchema);