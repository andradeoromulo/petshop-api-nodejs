const router = require('express').Router();
const Supplier = require('./Supplier');

router.get('/', async (req, res) => {
    const result = await Supplier.list();
    res.send(JSON.stringify(result));
});

router.post('/', async (req, res) => {
    const supplier = new Supplier(req.body);
    await supplier.create();
    res.send(JSON.stringify(supplier));
});

module.exports = router;