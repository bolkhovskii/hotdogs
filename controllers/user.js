const Sequelize = require("sequelize");
const Router = require("koa-router");
const models = require("../models/index");
const _ = require("lodash");

function getByUserEmail(req, res) {
  models.Customer.findAll({
    attributes: ["id"],
    where: {
      email: req.query.email,
    },
  }).then((customer) => {
    const isExist = !_.isEmpty(customer);
    res.status(200).json({ isExist });
  });
}

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
  getByUserEmail,
  getAllUsers,
  addNewUser,
  deleteUserById,
};

//   routers
//   .get(userController.getByCustomerEmail);

//   .delete("/user/:id", async (ctx, next) => {
//     ctx.status = 204;
//     await models.User.destroy({
//       where: {
//         id: ctx.params.id, //this will be your id that you want to delete
//       },
//     }).then(
//       function (rowDeleted) {
//         // rowDeleted will return number of rows deleted
//         if (rowDeleted === 1) {
//           console.log("Deleted successfully");
//         }
//       },
//       function (err) {
//         console.log(err);
//       }
//     );
//   });
