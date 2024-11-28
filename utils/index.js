const path = require('path')

function normalizeString(str) {
    return str
        .replace(/-/g, ' ')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
}

function returnCorrectPath (file) {
    if(process.env.NODE_ENV === 'production') {
        return `/etc/secrets/${file}`
    } else {
        return path.resolve(__dirname, '../credentials', file)
    }
}

module.exports = {
    normalizeString,
    returnCorrectPath
}