const movieService = require('../services/moviedbService')

const getRecentMovies = async (req, res) => {
    try {
        const movies = await movieService.getRecentMovies()
        res.json(movies)
    } catch (error) {
        res.status(500).send('Erro ao buscar filmes moviedb.', error.message)
    }
}

const getMoviesByTitle = async (req, res) => {
    const { titulo } = req.query

    if (!titulo) {
      return res.status(400).send('Favor, informar o título.')
    }
  
    try {
      const movies = await movieService.getMoviesByTitle(titulo)
  
      if (movies.length === 0) {
        return res.status(404).send('Nenhum filme encontrado.')
      }
  
      res.json(movies)
    } catch (error) {
      res.status(500).send(`Erro ao buscar filmes pelo título ${titulo}, erro: `, error.message)
    }
}

module.exports = {
    getRecentMovies,
    getMoviesByTitle
}