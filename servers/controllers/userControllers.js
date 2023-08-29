const { User } = require('../models')
const { sign } = require('../helpers/jwt')
const { comparePassword } = require('../helpers/bcrypt')

class UserController {
    static async register(req, res) {
        try {
            const { username, fullname, password } = req.body;    
            if(password.length < 8) {      
              res.status(401).json({ message: 'Password min 8 digit' })
            }  else {
              let getUsername = await User.findOne({
                where: {
                  username
                }
              })      
              if(getUsername == null) {
                await User.create({ username, fullname, password: password });
                res.status(201).json({ message: 'User registered successfully.' });
              } else {        
                res.status(401).json({ message: "username is already use" })        
              }
                
            }
          } catch (error) {
            console.log(error, 'err');
            res.status(500).json({ message: 'Registration failed.' });
          }
    }

    static async login(req, res, next) {
        try {
            let { username, password } = req.body
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