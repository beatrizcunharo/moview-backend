function normalizeString(str) {
    return str
        .replace(/-/g, ' ')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
}

module.exports = {
    normalizeString
}