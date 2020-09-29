const Sequelize = require("sequelize");
const Router = require("koa-router");
const models = require("../models/index");
const convert = require("koa-convert");
const KoaBody = require("koa-body");

const routers = new Router();
koaBody = convert(KoaBody());

// routers.get("/exampleee", async (ctx, next) => {
//   const user = await models.User.findAll();

//   ctx.body = { user };
// });

//Authorization

routers
  .get("/login", async (ctx, next) => {
    const user = await models.User.findAll();

    ctx.body = { user };
  })

  .post("/register", koaBody, async (ctx, next) => {
    ctx.status = 201;
    const user = await models.User.create(ctx.request.body);
  })
  .delete("/user/:id", async (ctx, next) => {
    ctx.status = 204;
    await models.User.destroy({
      where: {
        id: ctx.params.id, //this will be your id that you want to delete
      },
    }).then(
      function (rowDeleted) {
        // rowDeleted will return number of rows deleted
        if (rowDeleted === 1) {
          console.log("Deleted successfully");
        }
      },
      function (err) {
        console.log(err);
      }
    );
  });

//######################################################

module.exports = routers;
