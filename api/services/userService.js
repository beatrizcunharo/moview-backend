const db = require('../../database/firestore')

const createUser = async (usuario) => {
    try {
        const userEmailRef = await db.collection('usuarios').where('email', '==', usuario.email).get()
        const userNameRef = await db.collection('usuarios').where('user', '==', usuario.user).get()

        if (!userEmailRef.empty) {
            throw new Error('Já existe um usuário com esse email.');
        }

        if (!userNameRef.empty) {
            throw new Error('Já existe um usuário com esse nome de usuário.');
        }

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
        throw new Error(`Erro ao criar o usuário: ${e.message}`)
    }
}

const updateUser = async (userId, usuario) => {
    try {
        const userEmailRef = await db.collection('usuarios').where('email', '==', usuario.email).get()
        const userNameRef = await db.collection('usuarios').where('user', '==', usuario.user).get()

        if (!userEmailRef.empty && userEmailRef.docs[0].id !== userId) {
            throw new Error('Já existe um usuário com esse email.')
        }

        if (!userNameRef.empty && userNameRef.docs[0].id !== userId) {
            throw new Error('Já existe um usuário com esse nome de usuário.')
        }

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
            return null
        }

        const userDoc = snapshot.docs[0]
        const userData = userDoc.data()

        if (senha === userData.senha) {
            return {
                id: userDoc.id,
                name: userData.nome
            }
        } else {
            return null
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