const models = [
    require('../routes/suppliers/SupplierTableModel'),
    require('../routes/suppliers/products/ProductTableModel')
]

async function createTables() {
    for(let i=0; i<models.length; i++)
        await models[i].sync();
}

createTables();