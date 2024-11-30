const favoriteService = require('../services/favoriteService')

const addFavorite = async (req, res) => {
    const { userId, email, movieId } = req.body

    try {
        const response = await favoriteService.addFavorite(userId, email, movieId)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const removeFavorite = async (req, res) => {
    const { userId, movieId } = req.body

    try {
        const response = await favoriteService.removeFavorite(userId, movieId)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}
const getFavorite = async (req, res) => {
    const { userId } = req.params

    try {
        const favoritos = await favoriteService.getFavorite(userId)

        if (favoritos.message) {
            return res.status(404).json(favoritos)
        }

        return res.status(200).json(favoritos)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = {
    addFavorite,
    removeFavorite,
    getFavorite
}