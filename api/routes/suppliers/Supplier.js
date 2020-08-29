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
        const validData = this.validateData({company: this.company, email: this.email, category: this.category});

        const result = await SupplierTableModel.create({
            company: validData.company, 
            email: validData.email,
            category: validData.category
        });

        this.id = result.id;
        this.createdAt = result.createdAt;
        this.updatedAt = result.updatedAt;
        this.version = result.createdAt;
    }

    async update(propsObj) {
        await this.load();

        const validData = this.validateData(propsObj);

        if(Object.keys(validData).length === 0)
            throw new Error('No data to be updated');
        
        await SupplierTableModel.update(
            validData,
            {
                where: { id: this.id }
            }
        );
    }

    async delete() {
        await this.load();

        await SupplierTableModel.destroy({
            where: { id: this.id }
        });
    }

    validateData(propsObj) {
        const validData = {};

        for (let property in propsObj) {
            if(typeof propsObj[property] === 'string' &&
                propsObj[property] !== '' &&
                this.hasOwnProperty(property)) {
                    validData[property] = propsObj[property];
            } else {
                throw new Error('Fail to insert or update supplier due to invalid data');
            }
        }

        return validData;
    }
}

module.exports = Supplier;