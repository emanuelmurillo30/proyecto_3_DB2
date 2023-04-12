const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(express.json());

//app.use(require('../routes'));
app.use(require('../routes/acciones'));

module.exports = app;