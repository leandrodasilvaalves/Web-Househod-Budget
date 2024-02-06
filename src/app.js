const express = require('express');
const path = require('path');
const router = require('./router');

const app = express();
require('dotenv').config();
const port = process.env.PORT;

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', router);
app.listen(port, () => console.log(`Server is running: http://localhost:${port}`));