// const { verify } = require('../helpers/jwt')
// const { User } = require('../models')
const jwt = require('jsonwebtoken')

async function authentication(req, res, next) {

    const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Token not provided.' });
  }

  jwt.verify(token, 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token.' });
    }

    req.user = user;
    next();
  });

    // const token = req.header('Authorization');
      
    // if (!token) {
    //     return res.status(401).json({ message: 'Token not provided.' });
    // }
    
    // verify(token, (err, user) => {
    //     if(err) {
    //         return res.status(403).json({ message: "INVALID TOKEN" })
    //     }

    //     req.user = user
    //     next()
    // })
    // jwt.verify(token, 'your-secret-key', (err, user) => {
    //     if (err) {
    //     return res.status(403).json({ message: 'Invalid token.' });
    //     }
    
    //     req.user = user;
    //     next();
    // });

    // try {
    //     let { access_token } = req.headers
    //     if(access_token) {
    //         let decoded = verify(access_token)
    //         let data = await User.findOne({
    //             where: {
    //                 username: decoded.username
    //             }
    //         })
    //         if(data) {
    //             req.nowLogged = {
    //                 id: data.id,
    //                 username: data.username,
    //                 fullname: data.fullname
    //             }
    //             next()
    //         } else {
    //             throw { name: 'please login first!'}
    //         }
    //     } else {
    //         // throw { name: 'invalid access_token!'}
                          
    //     }
    // }
    // catch(err) {
    //     console.log(err);
    // }

    // const authenticateToken = (req, res, next) => {
    //     const token = req.header('Authorization');
      
    //     if (!token) {
    //       return res.status(401).json({ message: 'Token not provided.' });
    //     }
      
    //     jwt.verify(token, 'your-secret-key', (err, user) => {
    //       if (err) {
    //         return res.status(403).json({ message: 'Invalid token.' });
    //       }
      
    //       req.user = user;
    //       next();
    //     });
    //   };
}

module.exports = authentication