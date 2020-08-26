const SupplierTableModel = require('./SupplierTableModel');

class Supplier {
    constructor({id, company, email, category, createdAt, updatedAt, version}) {
        this.id = id;
        this.company = company;
        this.email = email;
        this.category = category;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.version = version;
    }
    static list() {
        return SupplierTableModel.findAll();
    }

    async create() {
        const result = await SupplierTableModel.create({
            company: this.company, 
            email: this.email,
            category: this.category
        });

        this.id = result.id;
        this.createdAt = result.createdAt;
        this.updatedAt = result.updatedAt;
        this.version = result.createdAt;
    }
}

module.exports = Supplier;