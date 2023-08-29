const axios = require('axios')
const API_KEY = process.env.API_KEY

class MovieController {
    static async showListMovies(req, res) {
        try {
            let page  = req.query.page
            console.log(page, 'cek');
            let { data } = await axios ({
                method: 'GET',                
                url: `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${page}`
            })
            res.status(200).json(data)
        } catch(err) {
            console.log(err);
            res.status(500).json(err)
        }
    }
    static async moviesDetails(req, res) {
        try {
            let id = +req.params.id
            let { data } = await axios({
                method: 'GET',
                url: `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
            })
            res.status(200).json(data)
        } catch(err) {
            res.status(500).json(err)
        }
    }
    static async moviesTrailers(req, res) {
        try {
            let id = +req.params.id
            let { data } = await axios({
                method: 'GET',
                url: `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`                
            })
            res.status(200).json(data)
        } catch(err) {
            res.status(500).json(err)
        }
    }    
}

module.exports = MovieController    