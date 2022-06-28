const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PeitionSchema = new Schema({
    description: {type: String, required: [true, 'Description is required']},
    courseId: {type: Schema.Types.ObjectId, ref: 'Course',required: [true, 'Course Id is required']},
    semester: {type: String, required: [true, 'Semester Id is required']},
    petitionStatus:{type: String, required: [true, 'Status is required']},
    studentId: {type: Schema.Types.ObjectId, ref: 'User',required: [true, 'Student Id is required']},
});

module.exports = mongoose.model('Petition', PeitionSchema);