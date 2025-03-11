const express = require('express')
require('dotenv').config()
const bcrypt = require('bcrypt')
const passport= require('passport')
const flash = require('express-flash')
const session = require('express-session')

const initializePassport = require('./passport-config')
initializePassport(passport, email => {
    return users.find (user => user.email === email)
})

const app = express()

const users =[]

//Setting view engine
app.set('view-engine', 'ejs')

app.use(express.urlencoded({extended: false}))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => {
    res.render('index.ejs', {name: "Martim"})
})
app.get('/login', (req,res) => {
    res.render('login.ejs')
})
app.get('/register', (req,res) => {
    res.render('register.ejs')
})

//Post to login users
app.post('/login', passport.authenticate('local', {
    successRedirect:('/'),
    failureRedirect:('/login'),
    failureFlash: true
}) )

//Post to register users
app.post('/register', async (req,res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString,
            name: req.body.name,
            password: hashedPassword,
            email: req.body.password

        })
        res.redirect('/login')
    } catch {
        res.redirect('register')
    }
    console.log(users)
})


app.listen(4000, () => {
    console.log('App running on port 4000')
})