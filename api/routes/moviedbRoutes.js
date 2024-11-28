const express = require('express')

const router = express.Router()

const movieController = require('../controllers/moviedbController')

router.get('/filmes-recentes', movieController.getRecentMovies)

router.get('/buscar-filmes', movieController.getMoviesByTitle)

router.get('/detalhes/:id', movieController.getMovieDetails)

module.exports = router