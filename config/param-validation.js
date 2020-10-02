const { Joi } = require("koa-joi-router");
const validate = require("koa-joi-validate");

// Логин
const loginValidator = validate({
  body: {
    email: Joi.string().email().min(6),
    password: Joi.string().min(6).max(32).required(),
  },
});

// Регистрация
const registerValidator = validate({
  body: {
    username: Joi.string().min(3).max(16).required(),
    email: Joi.string().email().min(4).required(),
    password: Joi.string().min(6).max(32).required(),
  },
});

// Создать итем
const createValidation = validate({
  body: {
    pictureName: Joi.string().required(),
    dishesName: Joi.string().min(3).max(16).required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
  },
});

// Получить весь список итемов
const readValidation = validate({
  query: {
    page: Joi.number().integer().min(1),
  },
  params: {
    id: Joi.number().integer().min(1),
  },
  options: {
    allowUnknownBody: false,
    allowUnknownHeaders: false,
    allowUnknownQuery: false,
    allowUnknownParams: false,
  },
});

//Обновить итем
const updateValidation = validate({
  params: { id: Joi.number().required() },
  body: {
    pictureName: Joi.string().required(),
    dishesName: Joi.string().min(3).max(16).required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
  },
});

//Удалить итем
const deleteValidation = validate({
  params: { id: Joi.number().required() },
});

module.exports = {
  loginValidator,
  registerValidator,
  createValidation,
  readValidation,
  updateValidation,
  deleteValidation,
};
