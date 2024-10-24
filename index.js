const express = require('express');
const mysql = require('mysql2');

const {port, host} = require('./config.json');
const path = require('path');

const dbconfig = require('./dbconfig.json');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true, }));

app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'templates'));

app.get('/',(req,res) =>{
    res.render('index.ejs')
})

app.get('/cats',(req,res) =>{
    res.render('allcats.ejs')
})


app.listen(port, host, () => {console.log(`cats projekti toimii ${host + port}  `)});