const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const router = require('./routes/suppliers/index');

const errHandler = require('./errors/handler');
const acceptedFormats = require('./Serializer').acceptedFormats;

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    let requestedFormat = req.header('Accept');

    if(requestedFormat === '*/*')
        requestedFormat = 'application/json';

    if(acceptedFormats.indexOf(requestedFormat) === -1) {
        res.status(406).end();
    } else {
        res.setHeader('Content-Type', requestedFormat);
        next();
    }
});

app.use('/api/suppliers', router);

app.use(errHandler); 

app.listen(config.get('api.port'), () => console.log('Server running on port 3000'));