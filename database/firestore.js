const admin = require('firebase-admin')
const { returnCorrectPath } = require('../utils')

const firebaseCredentialsPath = returnCorrectPath('serviceAccountKey.json')
const serviceAccount = require(firebaseCredentialsPath)

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
})

const db = admin.firestore()

module.exports = db