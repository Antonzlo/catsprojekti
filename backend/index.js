const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const mysql = require('mysql2');

const dbConfig = require('./dbconfig.json');
const { port, host } = require('./config.json');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'templates'));

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error('error', err);
    return;
  }
});

app.get('/cats', (req, res) => {
  const query = 'SELECT * FROM cats';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('error', err);
      res.status(500).send('server error');
      return;
    }

    res.json(results);
  });
});

app.get('/colours', (req, res) => {
    const query = 'SELECT DISTINCT color FROM cats';
  
    connection.query(query, (err, results) => {
      if (err) {
        console.error('error', err);
        res.status(500).send('server error');
        return;
      }
  
      res.json(results);
    });
  });

app.listen(port, host, () => {
  console.log(`cats projekti toimii ${host}:${port}`);
});
