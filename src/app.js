const express = require('express');
const path = require('path');
const router = require('./router');

const app = express();
require('dotenv').config();
const port = process.env.PORT;

app.use('/node_modules', express.static(path.join(__dirname, '..', 'node_modules')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '..', 'dist')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', router);
app.listen(port, () => console.log(`Server is running: http://localhost:${port}`));