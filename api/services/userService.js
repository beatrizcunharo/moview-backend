const db = require('../../database/firestore')

const createUser = async (usuario) => {
    try {
        const docRef = await db.collection('usuarios').add({
            nome: usuario.nome,
            cidade: usuario.cidade || '',
            estado: usuario.estado || '',
            descricao: usuario.descricao || '',
            user: usuario.user,
            senha: usuario.senha,
            dataCriacao: usuario.dataCriacao,
            dataNascimento: usuario.dataNascimento || '',
            email: usuario.email
        })
        return docRef.id
    } catch (e) {
        throw new Error("Erro ao criar o usuário.")
    }
}

const updateUser = async (userId, usuario) => {
    try {
        const docRef = db.collection('usuarios').doc(userId)

        await docRef.update({
            nome: usuario.nome,
            cidade: usuario.cidade || '',
            estado: usuario.estado || '',
            descricao: usuario.descricao || '',
            senha: usuario.senha,
            dataCriacao: usuario.dataCriacao,
            dataNascimento: usuario.dataNascimento || '',
            email: usuario.email
        })

        return { message: 'Usuário atualizado com sucesso.' }
    } catch (e) {
        throw new Error(`Erro ao atualizar o usuário: ${e.message}`)
    }
}

const deleteUser = async (userId) => {
    try {
        const userRef = db.collection('usuarios').doc(userId)
        const userSnapshot = await userRef.get()

        if (!userSnapshot.exists) {
            return null
        }

        await userRef.delete()
        return { message: 'Usuário deletado com sucesso' }
    } catch (e) {
        throw new Error(`Erro ao deletar o usuário: ${e.message}`)
    }
}

const loginUser = async (email, senha) => {
    try {
        const userRef = db.collection('usuarios')
        const snapshot = await userRef.where('email', '==', email).get()

        if (snapshot.empty) {
            return false
        }

        const userDoc = snapshot.docs[0]
        const userData = userDoc.data()

        if (senha === userData.senha) {
            return true
        } else {
            return false
        }
    } catch (error) {
        throw new Error('Erro interno ao realizar login')
    }
}

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    loginUser
}