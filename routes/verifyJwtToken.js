const jwt = require("jsonwebtoken");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];

verifyToken = (ctx, next) => {
  let token = ctx.headers["x-access-token"];
  ctx.set(token);
  if (!token) {
    ctx.status = 403;
    ctx.body = {
      auth: false,
      message: "No token provided.",
    };
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      ctx.body = {
        auth: false,
        message: "Fail to Authentication. Error -> " + err,
      };
    }
    //req.userId = decoded.id;
    ctx.throw(decoded.id);
  });
};

const authJwt = {};
authJwt.verifyToken = verifyToken;

module.exports = authJwt;
