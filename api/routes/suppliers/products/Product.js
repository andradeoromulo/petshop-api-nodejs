const NotFound = require('../../../errors/NotFound');
const ProductTableModel = require('./ProductTableModel');

class Product {
    constructor({ id, name, price, quantity, supplier, createdAt, updatedAt, version}) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.supplier = supplier;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.version = version;
    }

    static list(supplierId) {
        return ProductTableModel.findAll({
            where: {
                supplier: supplierId
            },
            raw: true
        });
    } 

    async load() {
        const result = await ProductTableModel.findOne({
            where: {
                id: this.id,
                supplier: this.supplier
            },
            raw: true
        });

        if(!result)
            throw new NotFound();
        
        this.name = result.name;
        this.price = result.price;
        this.quantity = result.quantity;
        this.createdAt = result.createdAt;
        this.updatedAt = result.updatedAt;
        this.version = result.version;
    }

    async create() {
        const result = await ProductTableModel.create({
            name: this.name,
            price: this.price,
            quantity: this.quantity,
            supplier: this.supplier
        });

        this.id = result.id;
        this.createdAt = result.createdAt;
        this.updatedAt = result.createdAt;
        this.version = result.version;
    }

    async update(propsObj) {
        await this.load();
        await ProductTableModel.update(
            propsObj,
            {
                where: {
                    id: this.id,
                    supplier: this.supplier
                }
            }
        );
    }

    async delete() {
        await ProductTableModel.destroy({
            where: {
                id: this.id,
                supplier: this.supplier
            }
        })
    }
} 

module.exports = Product;