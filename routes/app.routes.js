const Router = require("koa-router");

const routers = new Router();

routers.get("/exampleee", (ctx) => {
  ctx.body = { message: "Koa.js: Looks good to me!" };
});

module.exports = routers;
