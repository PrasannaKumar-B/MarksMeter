const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AssignmentSubmissionSchema = new Schema({
    studentId: {type: Schema.Types.ObjectId, ref:'User', required: [true, 'Student Id is required']},
    courseId: {type: Schema.Types.ObjectId, ref:'Course', required: [true, 'Course Id is required']},
    semester: {type: String, required: [true, 'Semester Id is required']},
    assignmentName: {type: String, required: [true, 'Assignemnet name is required']},
    assignmentSubmission: {type: String, required: [true, 'Submission is required']},
    grade: {type: String}
});

module.exports = mongoose.model('Assignmentsubmission', AssignmentSubmissionSchema);