const axios = require('axios')

const { normalizeString, returnCorrectPath } = require('../../utils')

const movieDbApiKeyPath = returnCorrectPath('moviedbApiKey.js')
const moviedbApiKey = require(movieDbApiKeyPath)

const BASE_URL = 'https://api.themoviedb.org/3'

async function getRecentMovies() {
    try {
        const response = await axios.get(`${BASE_URL}/movie/now_playing`, {
            params: {
                api_key: moviedbApiKey.apiKey,
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
                api_key: moviedbApiKey.apiKey,
                query: titulo,
                language: 'pt-BR',
                page: 1,
                sort_by: 'popularity.desc'
            },
        })

        const titleFixed = normalizeString(titulo)

        const responseFixed = response.data.results.filter(movie =>
            normalizeString(movie.title).includes(titleFixed)
        )

        return responseFixed
    } catch (error) {
        console.error(`Erro ao buscar filmes com o título ${titulo}, erro: `, error.message)
        throw error
    }
}

async function getMovieDetails(id) {
    try {
        const response = await axios.get(`${BASE_URL}/movie/${id}`, {
            params: {
                api_key: moviedbApiKey.apiKey,
                language: 'pt-BR'
            },
        })
        return response.data
    } catch (error) {
        console.error(`Erro ao buscar filme com o id ${id}, erro: `, error.message)
        throw error
    }
}

module.exports = {
    getRecentMovies,
    getMoviesByTitle,
    getMovieDetails
}