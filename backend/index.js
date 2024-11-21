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
  const query = 'SELECT DISTINCT * FROM cats';

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

  app.get('/size', (req, res) => {
    const query = 'SELECT DISTINCT size FROM cats';
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Query error:', err);
        res.status(500).send('Server error');
        return;
      }
      res.json(results);
    });
  });

  app.get('/character', (req, res) => {
    const query = 'SELECT DISTINCT personality FROM cats';
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Query error:', err);
        res.status(500).send('Server error');
        return;
      }
      res.json(results);
    });
  });

  app.get('/cats/:breed', (req, res) => {
    const { breed } = req.params;
    const query = 'SELECT * FROM cats WHERE breed = ?';

    connection.query(query, [breed], (err, results) => {
        if (err) {
            console.error('Query error:', err);
            res.status(500).send('Server error');
            return;
        }

        res.json(results);
    });
});

// const API_KEY = 'live_k8H3j6427nbvjiT295mUMnPf3eBTZbtG1pKasWF7Hj3453IKN0qab0Osf9HGwAMO '; 

// const fetchAndSaveCatBreeds = async () => {
//   try {
//       const response = await fetch('https://api.thecatapi.com/v1/breeds', {
//           headers: { 'x-api-key': API_KEY }
//       });
//       const breeds = await response.json();

//       const breedImages = breeds.map(breed => ({
//           breed: breed.name,
//           image: breed.image?.url || 'https://via.placeholder.com/150'
//       }));

//       console.log('Породы и фотографии:', breedImages);

    
//   } catch (error) {
//       console.error('Ошибка при загрузке данных:', error);
//   }
// };

// fetchAndSaveCatBreeds();

app.listen(port, host, () => {
  console.log(`cats projekti toimii ${host}:${port}`);
});