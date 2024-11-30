const express = require('express')

const movieRoutes = require('./moviedbRoutes')

const userRoutes = require('./userRoutes')

const router = express.Router()

router.use('/filmes', movieRoutes)

router.use('/usuario', userRoutes)

module.exports = router