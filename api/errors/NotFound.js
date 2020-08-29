class NotFound extends Error {
    constructor() {
        super('Supplier not found');
        this.name = 'NotFound';
        this.id = 0;
    }
}

module.exports = NotFound;