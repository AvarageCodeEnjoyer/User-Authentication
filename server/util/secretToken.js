require('dotenv').config
const jwt = require('jsonwebtoken')

module.exports.createSecretToken = (id) => {
  return jwt.sign({id}, process.env.SECRET_KEY, {expiration: 3 * 24 * 60 * 60})
}