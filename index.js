const express = require('express')
const app = express()
const port = 3000
const path = require('path');
const fs = require('fs')

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// in latest body-parser use like below.
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('pages/index')
})

app.get('/requirements', (req, res) => {
    res.render('pages/requirement')
})

app.get('/features', (req, res) => {
    res.render('pages/features')
})

app.get('/ranks', (req, res) => {
    res.render('pages/ranks')
})

app.get('/aboutus', (req, res) => {
    res.render('pages/aboutus')
})

app.get('/subscribe', (req, res) => {
    res.render('pages/subscribe')
})

app.get('/login', (req, res) => {
    res.render('pages/login')
})

app.get('/register', (req, res) => {
    res.render('pages/register')
})

app.get('/forgetpassword', (req, res) => {
    res.render('pages/forgetpassword')
})

app.get('/rps', (req, res) => {
    res.render('pages/rps')
})

app.get('/valorant', (req, res) => {
    res.render('pages/valorant')
})

app.get('/games', (req, res) => {
    res.render('pages/games')
})

app.post('/register-data', (req, res) => {
    res.writeHead(200,{"Content-Type" : "application/json"})
    res.end(JSON.stringify(req.body));
    fs.appendFile('user.txt', JSON.stringify(req.body), (err) =>{
        if(err) throw err;
        console.log("Saved!")
    })
})

app.post('/login-data', (req, res) => {
    res.writeHead(200,{"Content-Type" : "application/json"})
    //res.end(JSON.stringify(req.body));
    fs.readFile('user.txt' , 'utf-8',(err,data)=>{
        res.end(data)
        
        //res.end(JSON.stringify(req.body))
        if(data.includes(JSON.stringify(req.body))){
            console.log('test');
        }else{
            console.log('not found');
        }
    })
    // fs.appendFile('user.txt', JSON.stringify(req.body), (err) =>{
    //     if(err) throw err;
    //     console.log("Saved!")
    // })
})

app.get('/tes', (req,res) =>{
    const data = {
        name    : "Myoui Mina",
        age     : 24,
        address : "San Antonio Texas",
        phone   : "011223344",
        data    : {
            pacar   : "Fernandre",
            lama    : {
                tahunPacaran : 2015,
                lamaPacaran  : "6 Tahun"
            }
        }
    }
    res.end(JSON.stringify(data,null,4))
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

