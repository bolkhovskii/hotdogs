const Koa = require("koa");
const Sequelize = require("sequelize");

const app = new Koa();

const router = require("./routes/app.routes");
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
