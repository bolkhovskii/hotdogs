var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const models = require("../models/index");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];

const signup = (ctx, next) => {
  // Save User to Database
  console.log("Processing func -> SignUp");

  models.User.create({
    firstName: ctx.request.body.firstName,
    lastName: ctx.request.body.lastName,
    email: ctx.request.body.email,
    password: bcrypt.hashSync(ctx.request.body.password, 8),
    phone: ctx.request.body.phone,
    salt: ctx.request.body.salt,
    createdAt: ctx.request.body.createdAt,
    updatedAt: ctx.request.body.updatedAt,
  }).catch((err) => {
    ctx.status(500).send("Fail! Error -> " + err);
  });
};

const signin = async (ctx, next) => {
  console.log("Sign-In");
  console.log(ctx.request.body.email);

  await models.User.findAll({
    raw: true,
    where: {
      email: ctx.request.body.email,
    },
  }).then((user) => {
    if (!user) {
      ctx.status = 404;
      ctx.body = { message: "User Not Found." };
    }
    console.log(user);
    console.log("Password is valid");
    console.log("ctx.request.body.password " + ctx.request.body.password);
    console.log("user.password" + user[0].password);
    const passwordIsValid = bcrypt.compareSync(
      ctx.request.body.password,
      user[0].password
    );
    if (!passwordIsValid) {
      ctx.status = 401;
      ctx.body = {
        auth: false,
        accessToken: null,
        reason: "Invalid Email or Password!",
      };
    }
    console.log("Getting token");
    console.log(config.secret);
    var token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400, // expires in 24 hours
    });
    console.log(token);
    ctx.status = 200;
    ctx.body = { auth: true, accessToken: token };
  });
};

module.exports = { signin, signup };
