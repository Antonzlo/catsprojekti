const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const mysql = require('mysql2');
const fs = require('fs');


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
const commentsFilePath = path.join(__dirname, 'comments.json');


app.delete('/comments/:id', (req, res) => {
  const { id } = req.params;

  fs.readFile(commentsFilePath, 'utf-8', (err, data) => {
    if (err) {
      console.error('Error reading comments:', err);
      return res.status(500).send('Error reading comments');
    }

    let comments = JSON.parse(data || '[]');
    comments = comments.filter(comment => comment.id !== parseInt(id));

    fs.writeFile(commentsFilePath, JSON.stringify(comments, null, 2), (err) => {
      if (err) {
        console.error('Error deleting comment:', err);
        return res.status(500).send('Error deleting comment');
      }
      res.status(200).send('Comment deleted');
    });
  });
});

app.get('/comments/:breed', (req, res) => {
  const { breed } = req.params;
  fs.readFile(commentsFilePath, 'utf-8', (err, data) => {
      if (err) {
          console.error('Error reading comments:', err);
          return res.status(500).send('Error reading comments');
      }
      const comments = JSON.parse(data || '[]');
      const breedComments = comments.filter(comment => comment.breed === breed);
      res.json(breedComments);
  });
});

app.post('/comments/:breed', (req, res) => {
  const { breed } = req.params;
  const newComment = { ...req.body, breed }; 

  fs.readFile(commentsFilePath, 'utf-8', (err, data) => {
      if (err) {
          console.error('Error reading comments:', err);
          return res.status(500).send('Error reading comments');
      }

      const comments = JSON.parse(data || '[]');
      comments.push(newComment);

      fs.writeFile(commentsFilePath, JSON.stringify(comments, null, 2), (err) => {
          if (err) {
              console.error('Error saving comment:', err);
              return res.status(500).send('Error saving comment');
          }
          res.status(201).json(newComment);
      });
  });
});


app.listen(port, host, () => {
  console.log(`cats projekti toimii ${host}:${port}`);
});