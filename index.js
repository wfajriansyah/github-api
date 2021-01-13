const express = require('express');
const apis = require('./api');

const app = express();
const api = new apis();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Selamat datang di RESTFULL API')
})

app.get('/:username', async (req, res) => {
    // Getting repository of :username
    const username = req.params.username;

    if(username) {
        const doRepository = await api.getListRepository(username);
        res.send(doRepository);
    }
})

app.get('/:path', async (req, res) => {
    // Getting information repository of :path
    const path = req.params.path;

    if(path) {
        const doInfo = await api.getRepository(path);
        res.send(doInfo);
    }
});

app.listen(port, () => {
  console.log(`Server listening in ${port}`)
})