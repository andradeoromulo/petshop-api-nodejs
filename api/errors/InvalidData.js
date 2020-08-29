class InvalidData extends Error {
    constructor() {
        super('Fail to conclude due to invalid data');
        this.name = 'InvalidData';
        this.id = 1;
    }
}

module.exports = InvalidData;