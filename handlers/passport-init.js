const passport = require('koa-passport')
const passportConfig = require('../config/passport-config')

passportConfig(passport)

module.exports = passport.initialize()
