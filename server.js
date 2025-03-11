const express = require('express')
require('dotenv').config()
const bcrypt = require('bcrypt')

const app = express()

const users =[]

//Setting view engine
app.set('view-engine', 'ejs')
app.use(express.urlencoded({extended: false}))

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
app.post('/login', (req,res) => {

})

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