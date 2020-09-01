const NotFound = require('./NotFound');
const InvalidData = require('./InvalidData');
const NoData = require('./NoData');
const ErrorSerializer = require('../Serializer').ErrorSerializer; 

const handler = (err, req, res, next) => {
    let status = 500;

    if(err instanceof NotFound)
        status = 404;
    else if(err instanceof InvalidData || err instanceof NoData)
        status = 400;

    const serializer = new ErrorSerializer(res.getHeader('Content-Type'))
    res.status(status).send(serializer.serialize(err));
};

module.exports = handler;