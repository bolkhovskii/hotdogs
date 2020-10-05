const Koa = require("koa");

const config = require("./config/config");
const handlers = require("./handlers");
const router = require("./routes/app.routes");
// const cors = require('@koa/cors');

const app = new Koa();

handlers.forEach((h) => app.use(h));

// app.use(cors());
app.use(router.routes());
//app.use(router.middleware());
app.use(router.allowedMethods());

app.listen(config.port, () =>
  console.log(`App has been started on port ${config.port}...`)
);
