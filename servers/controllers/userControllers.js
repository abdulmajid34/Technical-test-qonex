class UserController {
    static async register(req, res, next) {
        try {
            let { username, fullname, password } = req.body
            let data = await User.create({
                username,
                fullname,
                password
            })
            if(data.username.length > 8) {
                res.status(201).json({ id: data.id, username: data.username, fullname: data.fullname })
            } else {
                throw({ name: "error min password 8 digits" })
            }
        } catch(err) {
            console.log(err);
            next(err)
        }
    }

    static async login(req, res, next) {
        try {
            let { username, fullname, password } = req.body
            let data = await User.findOne({
                where: {
                    username
                }
            })
            if(data) {
                let isPassword = comparePassword(password, data.password)
                if(isPassword) {
                    let token = sign({
                        id: data.id,
                        username: data.username
                    })
                    res.status(200).json({ id: data.id, username: data.username, fullname: data.fullname, access_token: token })
                } else {
                    throw { name: 'Unauthorize'}
                }
                
            } else {
                throw { name: 'Unauthorize'}
            }
        }
        catch(err) {
            console.log(err);
            next(err)
        }
    }
}

module.exports = UserController