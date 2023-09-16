const express = require('express');
const { log } = require('./helpers/log');
const app = express();
require('dotenv').config();

app.get('/', (req, res) => {
    res.send('Hola Mundo');
});
const { PORT } = process?.env;

app.listen(PORT, () => {
    log(`App corriendo en puerto ${PORT}`);
});