const Sequelize = require("sequelize");
const Router = require("koa-router");
const models = require("../models/index");

async function getAllUsers(ctx, next) {
  const user = await models.User.findAll();
  ctx.body = { user };
}

async function addNewUser(ctx, next) {
  ctx.status = 201;
  const user = await models.User.create(ctx.request.body);
}

async function deleteUserById(ctx, next) {
  await models.User.destroy({
    where: {
      id: ctx.params.id, //this will be your id that you want to delete
    },
  }).then(function (rowDeleted) {
    // rowDeleted will return number of rows deleted
    if (rowDeleted === 1) {
      ctx.status = 201;
    }
  });
}

module.exports = {
  getAllUsers,
  addNewUser,
  deleteUserById,
};
