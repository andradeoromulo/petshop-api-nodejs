const InvalidFormat = require('./errors/InvalidFormat');

class Serializer {
    serialize(data) {
        if(this.contentType === 'application/json')
            return this.json(data);
        
        throw new InvalidFormat();
    }

    json(data) {
        return JSON.stringify(data);
    }
}

module.exports = Serializer;