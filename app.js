const Koa = require("koa");
//const Router = require("koa-router");

const app = new Koa();
//const router = new Router();

const router = require("./routes/app.routes");
app.use(router.routes()).use(router.allowedMethods());

// router.get("/example", (ctx) => {
//   ctx.body = { message: "Koa.js: Looks good to me!" };
// });

app.listen(3000);
