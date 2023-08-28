const jwt = require('jsonwebtoken')
const JWT_SECRET = 'technical_test_qonex_key'

function sign(payload) {
    return jwt.sign(payload, JWT_SECRET)
}
function verify(payload) {
    return jwt.verify(payload, JWT_SECRET)
}

module.exports = { sign, verify }