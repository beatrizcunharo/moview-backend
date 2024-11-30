const express = require('express')

const router = express.Router()

const userController = require('../controllers/userController')

router.post('/criar', userController.createUser)

router.put('/atualizar/:id', userController.updateUser)

router.delete('/deletar/:id', userController.deleteUser)

router.post('/login', userController.loginUser)

module.exports = router;
