const router = require('express').Router()
const UserController = require('../controllers/userControllers')
const MovieController = require('../controllers/movieController');
const authentication = require('../middlewares/authentication')

router.get('/', (req, res) => {
    res.send("HELLO WORLD")
})
router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.use(authentication)
router.get('/list/movies', MovieController.showListMovies)
router.get('/movies/details/:id', MovieController.moviesDetails)
router.get('/movies/videos/:id', MovieController.moviesTrailers)

module.exports = router