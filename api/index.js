const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const router = require('./routes/suppliers/index');

const app = express();

app.use(bodyParser.json());

app.use('/api/suppliers', router);

app.listen(config.get('api.port'), () => console.log('Server running on port 3000'));