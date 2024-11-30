const userService = require('../services/userService')

const createUser = async (req, res) => {
    try {

        const usuarioId = await userService.createUser(req.body)

        return res.status(201).json({ message: 'Usuário criado com sucesso', usuarioId })
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao criar usuário', details: error.message })
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params

    try {
        const updatedUser = await userService.updateUser(id, req.body)

        if (!updatedUser) {
            return res.status(404).json({ error: 'Usuário não encontrado' })
        }

        return res.status(200).json({ message: 'Usuário atualizado com sucesso', updatedUser })
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao atualizar usuário', details: error.message })
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params

    try {
        const result = await userService.deleteUser(id)

        if (!result) {
            return res.status(404).json({ error: 'Usuário não encontrado' })
        }

        return res.status(200).json({ message: 'Usuário deletado com sucesso' })
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao deletar usuário', details: error.message })
    }
}

const loginUser = async (req, res) => {
    const { email, senha } = req.body

    try {
        const isAuthenticated = await userService.loginUser(email, senha)

        if (isAuthenticated) {
            return res.status(200).json({ response: true })
        } else {
            return res.status(401).json({ response: false })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Erro ao realizar login',
            success: false,
            error: error.message
        })
    }
}

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    loginUser
}