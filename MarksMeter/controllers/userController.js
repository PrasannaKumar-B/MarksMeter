const model = require("../models/user");
const Coursemodel = require("../models/course");
const registrationModel = require("../models/studentRegistration");
const petitionModel = require("../models/petetion");

exports.login = (req, res, next) => {
  let email = req.body.email;
  console.log(email);
  if (email) email = email.toLowerCase();
  let password = req.body.password;
  model
    .findOne({ email: email })
    .then((user) => {
      if (!user) {
        console.log("wrong email");
        req.flash("error", "wrong email address");
        res.redirect("/");
      } else {
        user.comparePassword(password).then((result) => {
          if (result) {
            req.session.user = user;
            console.log(req.session.user);
            console.log("Logged in");
            req.flash("success", "You have successfully logged in");
            res.redirect("/user/profile");
          } else {
            console.log("wrong password");
            req.flash("error", "wrong password");
            res.redirect("/");
          }
        });
      }
    })
    .catch((err) => next(err));
};

exports.dashboard = (req, res, next) => {
  let userProfile = req.session.user;
  let id = userProfile._id;
  console.log("Id : ", id);
  Promise.all([
    model.findById(id),
    registrationModel
      .find({ studentId: id })
      .populate("courseId", "courseName couseId"),
    petitionModel.find({ studentId: id }).populate("courseId", "courseName"),
  ])
    .then((results) => {
      let [user, courses, petitions] = results;
      console.log("courses for dashboard", courses);
      res.render("./user/dashboard", { user, courses, petitions });
    })
    .catch((err) => next(err));
};

exports.logout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    else res.redirect("/");
  });
};

exports.petition = (req, res, next) => {
  return res.render("./user/petition");
};

exports.postPetition = (req, res, next) => {
  let courseIdInput = req.body.courseId;
  Coursemodel.findOne({ courseId: courseIdInput })
    .then((course) => {
      let petition = new petitionModel(req.body);
      console.log(req.session.user._id);
      petition.studentId = req.session.user._id;
      petition.petitionStatus = "Pending";
      petition.courseId = course._id;
      console.log(petition);
      petition
        .save()
        .then((result) => res.redirect("/"))
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

exports.professorProfile = (req, res, next) => {
  let id = req.session.user._id;
  Promise.all([model.findById(id), Coursemodel.find({ teacher: id })])
    .then((results) => {
      const [user, courses] = results;
      console.log(courses);
      petitionModel
        .find({ courseId: { $in: courses.map((c) => c._id) } })
        .populate("courseId", "courseName")
        .then((petitions) => {
          console.log(petitions);
          res.render("./user/dashboard", { user, courses, petitions });
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

exports.acceptPetition = (req, res, next) => {
  console.log(req.params.id);
  petitionModel
    .findById(req.params.id)
    .then((petition) => {
      petition.petitionStatus = "Accepted";
      petition
        .save()
        .then((petition) => {
          res.redirect("/user/professor/profile");
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

exports.rejectPetition = (req, res, next) => {
  petitionModel
    .findById(req.params.id)
    .then((petition) => {
      petition.petitionStatus = "Rejected";
      petition
        .save()
        .then((petition) => {
          res.redirect("/user/professor/profile");
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};
