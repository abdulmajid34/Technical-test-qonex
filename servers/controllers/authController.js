const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const authenticate = require('../middlewares/authentication');

const generateAccessToken = (user) => {
  return jwt.sign(user, 'your-secret-key', { expiresIn: '30m' });
};

const register = async (req, res, next) => {
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
};

const login = async (req, res) => {
  try {
    const { username,  password } = req.body;
    
    const user = await User.findOne({ where: { username } });
    
    console.log(user, 'user');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    console.log(password, 'pass');
    console.log(user.password, 'test  pass');
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log(passwordMatch,'test');
    if (!passwordMatch) {      
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    

    const accessToken = generateAccessToken({ id: user.id, username: user.username });
    res.status(200).json({ id: user.id, username: user.username, fullname: user.fullname, accessToken });
  } catch (error) {
    res.status(500).json({ message: 'Login failed.' });
  }
};

module.exports = { register, login, authenticate };