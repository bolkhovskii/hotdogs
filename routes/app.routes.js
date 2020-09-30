const convert = require("koa-convert");
const KoaBody = require("koa-body");
const Router = require("koa-router");
const passport = require('koa-passport')

const authController = require("../controllers/auth");

const userController = require("../controllers/user");
const routers = new Router().prefix('/api');

routers
  //users
  .get("/users", passport.authenticate('jwt', { session: false }), userController.getAllUsers)
  .post("/register", KoaBody(), userController.addNewUser)
  .delete("/user/:id", convert(KoaBody()), userController.deleteUserById)

  //Authorization
  .post("/auth/signup", authController.signUp) 
  .post("/auth/signin", authController.signIn);

module.exports = routers;
