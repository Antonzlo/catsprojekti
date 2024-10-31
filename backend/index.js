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

// app.get('/cats', (req, res) => {
//   let query = 'SELECT * FROM cats';
//   const { category } = req.query;

//   if (category === 'Colours') query = "SELECT * FROM cats WHERE color='white'";
//   else if (category === 'Size') query = "SELECT * FROM cats WHERE size='medium'";
//   else if (category === 'Character') query = "SELECT * FROM cats WHERE personality='Calm and affectionate'";

//   db.query(query, (error, results) => {
//     if (error) return res.status(500).json({ error: error.message });
//     res.json(results);
//   });
// });



// app.get('/',(req,res) =>{
//     res.render('index.ejs')
// })

// app.get('/cats',(req,res) =>{
//     res.render('allcats.ejs')
// })

// app.get('/genret',(req,res)=>{
   
// })


app.listen(port, host, () => {console.log(`cats projekti toimii ${host + port}  `)});