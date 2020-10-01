const Koa = require("koa");

const config = require('./config/config')
const handlers = require('./handlers')
const router = require("./routes/app.routes");

const app = new Koa();

handlers.forEach((h) => app.use(h))

app.use(router.routes())
app.use(router.allowedMethods());

app.listen(config.port)
