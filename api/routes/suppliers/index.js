const router = require('express').Router();
const SupplierTableModel = require('./SupplierTableModel');

router.use('/', async (req, res) => {
    const result = await SupplierTableModel.findAll();
    res.send(JSON.stringify(result));
});

module.exports = router;