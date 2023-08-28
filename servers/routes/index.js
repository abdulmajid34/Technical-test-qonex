const router = require('express').Router()
const UserController = require('../controllers/userControllers')
const MovieController = require('../controllers/movieController');

router.post('/register', UserController.register)
router.post('/login', UserController.login)


router.get('/list/movies', MovieController.showListMovies)

module.exports = router