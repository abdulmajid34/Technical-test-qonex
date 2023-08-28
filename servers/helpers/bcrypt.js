const bcrypt = require('bcrypt')

function hashPassword(planPassword) {
    return bcrypt.hashSync(planPassword, 10)
}
function comparePassword(planPassword, encryptedPassowrd) {
    return bcrypt.compareSync(planPassword, encryptedPassowrd)
}

module.exports = { hashPassword, comparePassword }