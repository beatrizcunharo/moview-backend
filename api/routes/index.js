const express = require('express')

const movieRoutes = require('./moviedbRoutes')

const userRoutes = require('./userRoutes')

const favoriteRoutes = require('./favoriteRoutes')

const router = express.Router()

router.use('/filmes', movieRoutes)

router.use('/usuario', userRoutes)

router.use('/favoritos', favoriteRoutes)

module.exports = router