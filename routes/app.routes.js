const convert = require("koa-convert");
const KoaBody = require("koa-body");
//const Router = require("koa-router");
const Router = require("koa-joi-router");
const passport = require("koa-passport");
const validate = require("koa-joi-validate");

const authController = require("../controllers/auth");
const userController = require("../controllers/user");
const dishController = require("../controllers/dish");
const routers = new Router().prefix("/api");

const {
  loginValidator,
  registerValidator,
  createValidation,
  readValidation,
  updateValidation,
  deleteValidation,
} = require("../config/param-validation");

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
  .post("/auth/signup", registerValidator, authController.signUp)
  .post("/auth/signin", loginValidator, authController.signIn)

  //Dishes CRUD
  .post(
    "/dish",
    passport.authenticate("jwt", { session: false }),
    createValidation,
    dishController.dishCreate
  )
  .get(
    "/dish",
    passport.authenticate("jwt", { session: false }),
    readValidation,
    dishController.dishRead
  )
  .put(
    "/dish/:id",
    passport.authenticate("jwt", { session: false }),
    updateValidation,
    dishController.dishUpdate
  )
  .delete(
    "/dish/:id",
    passport.authenticate("jwt", { session: false }),
    deleteValidation,
    dishController.dishDelete
  );

module.exports = routers;
