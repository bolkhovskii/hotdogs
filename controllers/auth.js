const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const models = require("../models/index");

const env = process.env.NODE_ENV || "development";
// const config = require(__dirname + "/../config/config.json")[env];
const config = require("../config/config");

const signUp = async (ctx) => {
  const { username, email, password } = ctx.request.body;

  const user = await models.User.findOne({
    where: {
      email: ctx.request.body.email,
    },
  });
  if (user) ctx.throw(400, "Email is already exists");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hashSync(ctx.request.body.password, salt);

  await models.User.create({ username, email, password: hashedPassword });

  ctx.status = 201;
};

const signIn = async (ctx, next) => {
  const { email, password } = ctx.request.body;
  const user = await models.User.findOne({
    where: {
      email: email,
    },
  });
  if (!user) ctx.throw(400, "User with this email does not exists");

  const passwordIsValid = await bcrypt.compare(password, user.password);

  if (passwordIsValid) {
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(payload, config.secret, { expiresIn: 3600 * 24 });
    ctx.body = { auth: true, accessToken: `Bearer ${token}` };
  } else {
    ctx.throw(400, "Password incorrect");
  }
};

module.exports = { signIn, signUp };
