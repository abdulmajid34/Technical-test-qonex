const bcrypt = require('bcrypt')

function hashPassword(planPassword) {
    return bcrypt.hashSync(planPassword, 10)
}

const comparePassword = async (planPassword, encryptedPassowrd) => {
    return bcrypt.compareSync(planPassword, encryptedPassowrd)
}

module.exports = { hashPassword, comparePassword }