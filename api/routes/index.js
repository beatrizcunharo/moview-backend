const express = require('express')

const movieRoutes = require('./moviedbRoutes')

const router = express.Router()

router.use('/filmes', movieRoutes)

module.exports = router