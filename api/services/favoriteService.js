const db = require('../../database/firestore')

const addFavorite = async (userId, email, movieId) => {
    try {
        const favoritoRef = db.collection('favoritos').doc()

        await favoritoRef.set({
            userId: userId,
            movieId: movieId,
            email: email
        })

        return { message: 'Filme adicionado aos favoritos com sucesso!' }
    } catch (error) {
        throw new Error(`Erro ao adicionar filme aos favoritos: ${error.message}`)
    }
}

const removeFavorite = async (userId, movieId) => {
    try {
        const snapshot = await db.collection('favoritos')
            .where('userId', '==', userId)
            .where('movieId', '==', movieId)
            .get()

        if (snapshot.empty) {
            return { message: 'Favorito não encontrado.' }
        }

        snapshot.forEach(doc => {
            doc.ref.delete()
        })

        return { message: 'Filme removido dos favoritos com sucesso!' }
    } catch (error) {
        throw new Error(`Erro ao remover filme dos favoritos: ${error.message}`)
    }
}

const getFavorite = async (userId) => {
    try {
        const snapshot = await db.collection('favoritos')
            .where('userId', '==', userId)
            .get()

        if (snapshot.empty) {
            return { message: 'Nenhum favorito encontrado para este usuário.' }
        }

        const favoritos = snapshot.docs.map(doc => ({
            userId: doc.userId,
            movieId: doc.data().movieId,
            email: doc.data().email,
        }))

        return favoritos
    } catch (error) {
        throw new Error(`Erro ao obter favoritos: ${error.message}`)
    }
}

module.exports = {
    addFavorite,
    removeFavorite,
    getFavorite
}