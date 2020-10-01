const Joi = require("joi");
const validate = require("koa-joi-validate");

const loginValidator = validate({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const registerValidator = validate({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = { loginValidator, registerValidator };
