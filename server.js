const express = require('express')
require('dotenv').config()

const app = express()


app.get('/', (req, res) => {
    res.render('index.ejs')
})


app.listen(4000, () => {
    console.log('App running on port 4000')
})