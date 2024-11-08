const express = require('express');
const path = require('path');
const cors = require('cors');
const { port, host } = require('./config.json');
const app = express();

// Import routes
require('./database')(app); // Pass `app` to the database file

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'templates'));

// Start the server
app.listen(port, host, () => {
  console.log(`cats projekti toimii ${host}:${port}`);
});
