const axios = require('axios')
const API_KEY = '88bd736dd382b7b9688a1d6eaba2b7cc'

class MovieController {
    static async showListMovies(req, res, next) {
        try {
            let { data } = await axios ({
                method: 'GET',
                url: `https://api.themoviedb.org/3/movie/now_playing?api_key=&language=${API_KEY}en-US&page=`
            })
            res.status(200).json(data)
        } catch(err) {
            console.log(err);
        }
    }
}

module.exports = MovieController    