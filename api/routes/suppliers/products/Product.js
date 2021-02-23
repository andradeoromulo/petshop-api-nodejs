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
            }
        });
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