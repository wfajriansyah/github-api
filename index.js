const express = require('express');
const apis = require('./api');

const app = express();
const api = new apis();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Selamat datang di RESTFULL API')
})

app.get('/:username', (req, res) => {
    // Getting repository of :username
    const username = req.params.username;

    
})

app.listen(port, () => {
  console.log(`Server listening in ${port}`)
})