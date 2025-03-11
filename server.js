const express = require('express')
require('dotenv').config()

const app = express()

//Setting view engine
app.set('view-engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index.ejs', {name: "Martim"})
})
app.get('/login', (req,res) => {
    res.render('login.ejs')
})
app.get('/register', (req,res) => {
    res.render('register.ejs')
})

//Post to register users
app.post('/register', (req,res) => {
    
})


app.listen(4000, () => {
    console.log('App running on port 4000')
})