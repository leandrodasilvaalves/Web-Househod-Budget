const express = require('express');
const path = require('path');
const homeController = require('./controllers/homeController');
const transactionController = require('./controllers/transactionController');


const app = express();
const port = 3000;

app.use(express.static('public'));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use('/transactions', express.static(path.join(__dirname, 'transactions')));

app.use('/', homeController);
app.use('/', transactionController);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});