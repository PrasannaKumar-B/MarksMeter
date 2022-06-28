const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CoursesSchema = new Schema({
    courseName: {type: String, required: [true, 'Course name is required']},
    courseId: {type: String, required: [true, 'Course Id is required']},
    semester: {type: String, required: [true, 'Semester Id is required']},
    teacher: {type: Schema.Types.ObjectId, ref: 'User',required: [true, 'Professor Id is required']}
});

module.exports = mongoose.model('Course', CoursesSchema);