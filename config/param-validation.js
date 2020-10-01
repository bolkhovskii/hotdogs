const { Joi } = require("koa-joi-router");
const validate = require("koa-joi-validate");

const loginValidator = validate({
  body: {
    email: Joi.string().email().min(6),
    password: Joi.string().min(6).max(32).required(),
  },
});

const registerValidator = validate({
  body: {
    username: Joi.string().min(3).max(16).required(),
    email: Joi.string().email().min(4).required(),
    password: Joi.string().min(6).max(32).required(),
  },
});

module.exports = { loginValidator, registerValidator };
