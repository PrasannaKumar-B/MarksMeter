const Coursemodel = require("../models/course");
const assignmentSubmissionModel = require("../models/assignmentSubmission");
const assignmentModel = require("../models/assignment");

exports.assignments = (req, res, next) => {
  console.log("CourseId : ", req.params.id);
  Promise.all([
    assignmentSubmissionModel.find({
      studentId: req.session.user._id,
      courseId: req.params.id,
    }),
    assignmentModel.find({ courseRefId: req.params.id }),
  ])
    .then((results) => {
      const [submissions, assignments] = results;
      res.render("./course/assignments", { assignments, submissions });
    })
    .catch((err) => next(err));
};

exports.newAssignment = (req, res, next) => {
  res.render("./course/newAssignment");
};

exports.createAssignements = (req, res, next) => {
  let assignment = new assignmentModel(req.body);
  console.log(assignment);
  console.log("COURSE ID ENTERED : ", assignment.courseId);
  Coursemodel.findOne({ courseId: assignment.courseId })
    .then((course) => {
      console.log("Course: ", course);
      assignment.courseRefId = course._id;
      assignment.assignmentStatus = "created";
      console.log("Assignment to be created : ", assignment);
      assignment
        .save()
        .then((assignment) => res.redirect("/"))
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

exports.submitAssignment = (req, res, next) => {
  console.log(req.params.id);
  assignmentModel
    .findById(req.params.id)
    .then((assignment) => {
      let assignmentSubmission = new assignmentSubmissionModel(req.body);
      assignmentSubmission.studentId = req.session.user._id;
      assignmentSubmission.courseId = assignment.courseRefId;
      assignmentSubmission.semester = assignment.semester;
      assignmentSubmission.assignmentName = assignment.assignmentName;
      assignmentSubmission.grade = "NA";
      console.log(assignmentSubmission);
      assignment.assignmentStatus = "submitted";
      assignment
        .save()
        .then((assignment) => {
          assignmentSubmission
            .save()
            .then((assignmentSubmission) => {
              res.redirect("/");
            })
            .catch((err) => next(err));
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

exports.gradeAssignments = (req, res, next) => {
  assignmentSubmissionModel
    .find({ courseId: req.params.id })
    .then((submissions) => {
      res.render("./course/grades", { submissions });
    })
    .catch((err) => next(err));
};

exports.postGrade = (req, res, next) => {
  assignmentSubmissionModel
    .findById(req.params.id)
    .then((assignment) => {
      console.log(req.body.grade);
      assignment.grade = req.body.grade;
      assignment
        .save()
        .then((assignment) => {
          res.redirect("/user/professor/profile");
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};
