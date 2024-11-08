const mysql = require('mysql2');
const dbConfig = require('./dbconfig.json');

const connection = mysql.createConnection(dbConfig);
connection.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
    return;
  }
  console.log('Connected to the database');
});

module.exports = (app) => {
  app.get('/cats', (req, res) => {
    const query = 'SELECT * FROM cats';
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Query error:', err);
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
        console.error('Query error:', err);
        res.status(500).send('Server error');
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
};
