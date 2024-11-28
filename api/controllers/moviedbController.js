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

const getMovieDetails = async (req, res) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).send('Id não identificado')
  }

  try {
    const movieDetails = await movieService.getMovieDetails(id)

    if (!movieDetails || Object.keys(movieDetails).length === 0) {
      return res.status(404).send('Não foi possível encontrar os detalhes do filme.')
    }

    res.json(movieDetails)
  } catch (error) {
    res.status(500).send(`Erro ao buscar detalhes do filme com o ID ${id}, erro: ${error.message}`)
  }
};

module.exports = {
  getRecentMovies,
  getMoviesByTitle,
  getMovieDetails
}