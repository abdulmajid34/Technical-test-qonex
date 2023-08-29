const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_KEY

function sign(payload) {
    return jwt.sign(payload, JWT_SECRET)
}

module.exports = { sign }