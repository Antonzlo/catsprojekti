const express = require('express')
const path = require('path');
const app = express();
const cors = require('cors');
const mysql = require('mysql2');

const db = require('./dbconfig.json');
const {port, host} = require('./config.json');

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true, }));

app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'templates'));




// app.get('/',(req,res) =>{
//     res.render('index.ejs')
// })

// app.get('/cats',(req,res) =>{
//     res.render('allcats.ejs')
// })

// app.get('/genret',(req,res)=>{
   
// })


app.listen(port, host, () => {console.log(`cats projekti toimii ${host + port}  `)});