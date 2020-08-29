class InvalidFormat extends Error {
    constructor() {
        super('Format not supported by the API');
        this.name = 'InvalidData';
        this.id = 3;
    }
}

module.exports = InvalidFormat;