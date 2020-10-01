const convert = require("koa-convert");
const KoaBody = require("koa-body");
//const Router = require("koa-router");
const Router = require("koa-joi-router");
const passport = require("koa-passport");
const validate = require("koa-joi-validate");

const authController = require("../controllers/auth");
const userController = require("../controllers/user");
const routers = new Router().prefix("/api");

const { loginValidator } = require("../config/param-validation");
const { Joi } = require("koa-joi-router");

routers
  //users
  .get(
    "/users",
    passport.authenticate("jwt", { session: false }),
    userController.getAllUsers
  )
  .post("/register", KoaBody(), userController.addNewUser)
  .delete("/user/:id", convert(KoaBody()), userController.deleteUserById)

  //Authorization
  .post("/auth/signup", authController.signUp)
  // .post(
  //   "/auth/signin",
  //   validate({
  //     body: {
  //       email: Joi.string().email().min(6),
  //     },
  //   }),
  //   authController.signIn
  // );
  .post("/auth/signin", loginValidator, authController.signIn);

module.exports = routers;
