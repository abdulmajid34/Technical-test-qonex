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
        const { username,  password } = req.body;
        
        const user = await User.findOne({ where: { username } });
        
        console.log(user, 'user login');
        
        if (!user) {
          return res.status(404).json({ message: 'Username not found.' });
        }
        const passwordMatch = await comparePassword(password, user.password);    
        console.log(passwordMatch, 'test');
        if (!passwordMatch) {      
          return res.status(401).json({ message: 'invalid password!' });
        }
        const accessToken = sign({ id: user.id, username: user.username });
        res.status(200).json({ id: user.id, username: user.username, fullname: user.fullname, accessToken });
      } catch (error) {
        res.status(500).json({ message: 'Login failed.' });
      }
    }
}

module.exports = UserController