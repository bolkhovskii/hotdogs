const Koa = require("koa");
const Sequelize = require("sequelize");
const koaBody = require("koa-bodyparser");

const app = new Koa();
app.use(koaBody());
const router = require("./routes/app.routes");
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
