const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const cors = require('cors');
const mysql = require('mysql2');
const fs = require('fs');

const dbConfig = require('./dbconfig.json');
const db = require('./dbconfig2.json');
const { port, host } = require('./config.json');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'templates'));

const connection = mysql.createConnection(dbConfig);
const connection2 = mysql.createConnection(db);


connection2.connect((err) => {
  if (err) {
    console.error('error', err);
    return;
  }
});

connection.connect((err) => {
  if (err) {
    console.error('error', err);
    return;
  }
});
app.get('/cats', (req, res) => {
  const { color, size, character } = req.query; 
  let query = 'SELECT DISTINCT * FROM cats'; 
  let params = [];

  if (color) {
    query = `SELECT * FROM cats WHERE FIND_IN_SET(?, color)`; 
    params = [color];
  } else if (size) {
    query = `SELECT * FROM cats WHERE FIND_IN_SET(?, size)`; 
    params = [size];
  } else if (character) {
    query = `SELECT * FROM cats WHERE FIND_IN_SET(?, personality)`; 
    params = [character];
  }

  connection.query(query, params, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Server error');
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

//users

connection2.connect((err) => {
  if (err) {
    console.error('Could not connect to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});


app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Ei käytetä HTTPS:ää kehityksessä
  },
}));

function hashPassword(password) {
  return password.split('').reverse().join('');
}

app.use(express.static(__dirname));

app.post('/register', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('Username and password are required.');
  }

  connection2.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) {
      return res.status(500).send('Error checking username.');
    }

    if (results.length > 0) {
      return res.status(400).send('Username already exists.');
    }

    const hashedPassword = hashPassword(password);

    connection2.query(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, hashedPassword],
      (err, result) => {
        if (err) {
          return res.status(500).send('Error registering user.');
        }
        res.status(201).send('Registration successful.');
      }
    );
  });
});
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send({ error: 'Username and password are required.' });
  }

  const hashedPassword = hashPassword(password);

  connection2.query(
    'SELECT * FROM users WHERE username = ? AND password = ?',
    [username, hashedPassword],
    (err, results) => {
      if (err) {
        return res.status(500).send({ error: 'Error logging in.' });
      }

      if (results.length === 0) {
        return res.status(401).send({ error: 'Invalid username or password.' });
      }

      req.session.user = { username };

      res.json({
        message: 'Login successful.',
        user: { username }
      });
    }
  );
});



app.post('/logout', (req, res) => {
  if (req.session.user) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send('Could not log out. Try again.');
      }
      res.send('Logout successful.');
    });
  } else {
    res.status(400).send('No user logged in.');
  }
});
app.get('/profile', (req, res) => {
  if (!req.session.user) {
    return res.status(401).send('Please log in to view this page.');
  }

  const username = req.session.user.username;
  connection2.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) {
      return res.status(500).send('Error fetching user profile.');
    }

    if (results.length === 0) {
      return res.status(404).send('User not found.');
    }

    const userProfile = results[0]; 
    res.json(userProfile); 
  });
});



app.listen(port, host, () => {
  console.log(`cats projekti toimii ${host}:${port}`);
});