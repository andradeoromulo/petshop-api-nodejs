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

    async load() {
        const result = await SupplierTableModel.findOne(
            {
                where: { id: this.id }
            }
        );

        if(!result)
            throw new Error('Supplier not found');

        this.company = result.company;
        this.email = result.email;
        this.category = result.category;
        this.createdAt = result.createdAt;
        this.updatedAt = result.updatedAt;
        this.version = result.version;
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

    async update(newData) {
        await this.load();

        for(let property in newData) {
            if (typeof newData[property] !== 'string' || 
                newData[property] === '' ||
                !this.hasOwnProperty(property)) {
                    throw new Error('Fail to update supplier due to invalid data type');
            }
        }
        
        await SupplierTableModel.update(
            newData,
            {
                where: { id: this.id }
            }
        );
    }
}

module.exports = Supplier;