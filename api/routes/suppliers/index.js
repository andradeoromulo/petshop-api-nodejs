const router = require('express').Router();
const Supplier = require('./Supplier');

router.get('/', async (req, res) => {
    const result = await Supplier.list();
    res.send(JSON.stringify(result));
});

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const supplier = new Supplier({id});
        await supplier.load();
        res.send(JSON.stringify(supplier));
    } catch(err) {
        res.send(JSON.stringify({
            message: err.message
        }));
    }
});

router.post('/', async (req, res) => {
    try{
        const supplier = new Supplier(req.body);
        await supplier.create();
        res.send(JSON.stringify(supplier));
    } catch(err) {
        res.send(JSON.stringify({
            message: err.message
        }));
    }
});

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const supplier = new Supplier({id});
        await supplier.update(req.body);
        res.status(200).end();
    } catch(err) {
        res.send(JSON.stringify({
            message: err.message
        }));
    }
});

router.delete('/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const supplier = new Supplier({id});
        await supplier.delete();
        res.status(200).end();
    } catch (err) {
        res.send(JSON.stringify({
            message: err.message
        }));
    }
});

module.exports = router;