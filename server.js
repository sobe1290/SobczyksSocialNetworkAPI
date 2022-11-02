const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const app = express();
const port = 3001;

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server for ${activity} running on port ${PORT}!`);
  });
});



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);