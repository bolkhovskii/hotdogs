const convert = require("koa-convert");
const KoaBody = require("koa-body");
const Router = require("koa-router");
const verifySignUp = require("./verifySignUp");
const authJwt = require("./verifyJwtToken");
const authController = require("../controllers/auth");

const userController = require("../controllers/user");
const routers = new Router();

//Authorization

routers
  .get("/users", authJwt.verifyToken, userController.getAllUsers)
  .post("/register", KoaBody(), userController.addNewUser)
  .delete("/user/:id", convert(KoaBody()), userController.deleteUserById)
  .post(
    "/api/auth/signup",
    verifySignUp.checkDuplicateUserNameOrEmail,
    authController.signup
  )
  .post("/api/auth/signin", authController.signin);

module.exports = routers;
