const express = require('express')
const app = express()
const port = 3000
const path = require('path');

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/requirements', (req, res) => {
    res.render('requirement')
})

app.get('/features', (req, res) => {
    res.render('features')
})

app.get('/ranks', (req, res) => {
    res.render('ranks')
})

app.get('/aboutus', (req, res) => {
    res.render('aboutus')
})

app.get('/subscribe', (req, res) => {
    res.render('subscribe')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.get('/forgetpassword', (req, res) => {
    res.render('forgetpassword')
})

app.get('/rps', (req, res) => {
    res.render('rps')
})

app.get('/valorant', (req, res) => {
    res.render('valorant')
})

app.get('/games', (req, res) => {
    res.render('games')
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

