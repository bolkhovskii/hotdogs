const models = require("../models/index");

checkDuplicateUserNameOrEmail = (ctx, next) => {
  console.log(ctx.request.body);
  // -> Check Username is already in use
  models.User.findOne({
    where: {
      email: ctx.request.body.email,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send("Fail -> Email is already taken!");
      return;
    }
    next();
  });
};

const signUpVerify = {};
signUpVerify.checkDuplicateUserNameOrEmail = checkDuplicateUserNameOrEmail;

module.exports = signUpVerify;
