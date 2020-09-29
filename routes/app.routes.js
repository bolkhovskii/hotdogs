const convert = require("koa-convert");
const KoaBody = require("koa-body");
const Router = require("koa-router");

const userController = require("../controllers/user");
const routers = new Router();

//Authorization

routers
  .get("/users", userController.getAllUsers)
  .post("/register", KoaBody(), userController.addNewUser)
  .delete("/user/:id", convert(KoaBody()), userController.deleteUserById);

module.exports = routers;

// const paramValidation = require('../config/paramValidation');
// const customerController = require('../controllers/customer');

// const router = express.Router();  // eslint-disable-line new-cap

// router.route('/')
//   .get(validate(paramValidation.customer.getByCustomerEmail))
//   .get(customerController.getByCustomerEmail);

// module.exports = router;
