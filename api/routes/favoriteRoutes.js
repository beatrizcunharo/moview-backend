const express = require('express')

const router = express.Router()

const favoriteController = require('../controllers/favoriteController')

router.post('/adicionar', favoriteController.addFavorite)

router.delete('/remover', favoriteController.removeFavorite)

router.get('/listar/:userId', favoriteController.getFavorite)

module.exports = router;