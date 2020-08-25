const SupplierTableModel = require('../routes/suppliers/SupplierTableModel');

SupplierTableModel
    .sync()
    .then(() => console.log('Tables successfully created'))
    .catch(console.log);