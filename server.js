const express = require('express')
const routes = require('./api/routes')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 8000

app.use(cors({
    origin: 'http://localhost:3000'
}))

app.use('/api', routes)

app.listen(PORT, () => {
    console.log(`Port ${PORT}`);
})
