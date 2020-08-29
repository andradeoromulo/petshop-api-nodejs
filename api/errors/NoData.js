class NoData extends Error {
    constructor() {
        super('No data provided');
        this.name = 'NoData';
        this.id = 2;
    }
}

module.exports = NoData;