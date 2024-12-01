const express = require('express')

const router = express.Router()

const userController = require('../controllers/userController')

router.post('/criar', userController.createUser)

router.put('/atualizar/:id', userController.updateUser)

router.delete('/deletar/:id', userController.deleteUser)

router.post('/login', userController.loginUser)

router.get('/buscar/:id', userController.getUserById)

router.get('/buscar-nome/:username', userController.getUserByUsername)

module.exports = router;
