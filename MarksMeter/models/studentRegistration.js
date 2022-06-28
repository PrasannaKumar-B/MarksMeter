const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RegistrationSchema = new Schema({
    courseId: {type: Schema.Types.ObjectId, ref: 'Course', required: [true, 'Course Id is required']},
    studentId: {type: Schema.Types.ObjectId, ref: 'User',required: [true, 'Student Id is required']},
    grade:{type: String}
});

module.exports = mongoose.model('Registration', RegistrationSchema);