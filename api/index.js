const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const router = require('./routes/suppliers/index');

const acceptedFormats = require('./Serializer').acceptedFormats;

// Errors
const NotFound = require('./errors/NotFound');
const InvalidData = require('./errors/InvalidData');
const NoData = require('./errors/NoData');
const InvalidFormat = require('./errors/InvalidFormat');

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

app.use((err, req, res, next) => {
    let status = 500;

    if(err instanceof NotFound)
        status = 404;
    else if(err instanceof InvalidData || err instanceof NoData)
        status = 400;
    else if(err instanceof InvalidFormat)
        status = 406;

    res.status(status).send(JSON.stringify({
        message: err.message,
        id: err.id
    }));
});

app.listen(config.get('api.port'), () => console.log('Server running on port 3000'));