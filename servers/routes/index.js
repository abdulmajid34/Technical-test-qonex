const router = require('express').Router()
const UserController = require('../controllers/userControllers')
const MovieController = require('../controllers/movieController');
const authentication = require('../middlewares/authentication')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.use(authentication)

router.get('/list/movies', MovieController.showListMovies)

module.exports = router