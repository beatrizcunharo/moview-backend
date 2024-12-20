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
        const user = await userService.loginUser(email, senha)

        if (user) {
            return res.status(200).json({
                response: true,
                id: user.id,
                name: user.name
            })
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

const getUserById = async (req, res) => {
    const { id } = req.params

    try {
        const user = await userService.getUserById(id)

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' })
        }

        return res.status(200).json({ message: 'Usuário encontrado com sucesso', user })
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar usuário por ID', details: error.message })
    }
}

const getUserByUsername = async (req, res) => {
    const { username } = req.params

    try {
        const user = await userService.getUserByUsername(username)

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' })
        }

        return res.status(200).json({ message: 'Usuário encontrado com sucesso', user })
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar usuário por username', details: error.message })
    }
}

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    loginUser,
    getUserById,
    getUserByUsername
}