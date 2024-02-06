const express = require('express');
const path = require('path');
const router = require('./router');

require('dotenv').config();
const { PORT, HOST, PROTOCOL } = process.env;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', router);
app.listen(PORT, () => console.log(`Server is running: ${PROTOCOL}://${HOST}:${PORT}`));