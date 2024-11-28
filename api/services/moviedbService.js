const axios = require('axios')

const { normalizeString } = require('../../utils')

const BASE_URL = 'https://api.themoviedb.org/3'

const moviedbApiKey = require('/etc/secrets/moviedbApiKey.js');

async function getRecentMovies() {
    try {
        const response = await axios.get(`${BASE_URL}/movie/now_playing`, {
            params: {
                api_key: moviedbApiKey,
                language: 'pt-BR',
                page: 1
            },
        })
        return response.data.results
    } catch (error) {
        console.error('Erro ao buscar filmes moviedb:', error.message)
        throw error
    }
}

async function getMoviesByTitle(titulo) {
    try {
        const response = await axios.get(`${BASE_URL}/search/movie`, {
            params: {
                api_key: moviedbApiKey,
                query: titulo,
                language: 'pt-BR',
                page: 1,
                sort_by: 'popularity.desc'
            },
        })

        const titleFixed = normalizeString(titulo)

        const responseFixed = response.data.results.filter(movie =>
            normalizeString(movie.title) === titleFixed
        )

        return responseFixed
    } catch (error) {
        console.error(`Erro ao buscar filmes com o título ${titulo}, erro: `, error.message)
        throw error
    }
}

module.exports = {
    getRecentMovies,
    getMoviesByTitle
}