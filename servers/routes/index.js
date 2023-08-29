const router = require('express').Router()
// const UserController = require('../controllers/userControllers')
// const MovieController = require('../controllers/movieController');
// const authentication = require('../middlewares/authentication')
const { register, login, authController } = require('../controllers/authController')

router.get('/', (req, res) => {
    res.send("HELLO WORLD")
})
router.post('/register', register)
router.post('/login', login)

router.get('/protected', authController, (req, res) => {
    res.json({ message: "HELLO WORLD" })
})

// router.use(authentication)
router.get('/list/movies', MovieController.showListMovies)

module.exports = router