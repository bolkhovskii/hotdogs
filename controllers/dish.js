const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const models = require("../models/index");

const env = process.env.NODE_ENV || "development";
// const config = require(__dirname + "/../config/config.json")[env];
const config = require("../config/config");

const dishCreate = async (ctx) => {
  const { pictureName, dishesName, price, description } = ctx.request.body;

  const dish = await models.Dish.findOne({
    where: {
      dishesName: dishesName,
    },
  });
  if (dish) ctx.throw(400, "Dish is already exists");

  //const salt = await bcrypt.genSalt(10);
  //const hashedPassword = await bcrypt.hashSync(ctx.request.body.password, salt);

  await models.Dish.create({ pictureName, dishesName, price, description });

  ctx.status = 201;
};

const dishRead = async (ctx) => {
  const dish = await models.Dish.findAll();
  if (!dish) ctx.throw(404, "Not found");

  ctx.body = { dish };
  ctx.status = 200;
};

const dishUpdate = async (ctx) => {
  const { id } = ctx.params;
  const { pictureName, dishesName, price, description } = ctx.request.body;

  const dish = await models.Dish.update(
    {
      pictureName: pictureName,
      dishesName: dishesName,
      price: price,
      description: description,
    },
    {
      where: {
        id: id,
      },
    }
  );
  ctx.status = 204;
};

const dishDelete = async (ctx) => {
  const { id } = ctx.params;

  const dish = await models.Dish.destroy({
    where: {
      id: id, //this will be your id that you want to delete
    },
  }).then(function (rowDeleted) {
    // rowDeleted will return number of rows deleted
    if (rowDeleted === 1) {
      ctx.status = 204;
    }
  });
  if (!dish) ctx.status = 404;
};

module.exports = { dishCreate, dishRead, dishUpdate, dishDelete };
