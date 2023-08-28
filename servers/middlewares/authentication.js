const { verify } = require('../helpers/jwt')
const { User } = require('../models')

async function authentication(req, res, next) {
    try {
        let { access_token } = req.headers
        if(access_token) {
            let decoded = verify(access_token)
            let data = await User.findOne({
                where: {
                    username: decoded.username
                }
            })
            if(data) {
                req.nowLogged = {
                    id: data.id,
                    username: data.username,
                    fullname: data.fullname
                }
                next()
            } else {
                throw { name: 'please login first!'}
            }
        } else {
            throw { name: 'invalid access_token!'}               
        }
    }
    catch(err) {
        console.log(err);
    }
}

module.exports = authentication