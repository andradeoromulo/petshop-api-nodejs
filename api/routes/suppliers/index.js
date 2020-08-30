const router = require('express').Router();
const Supplier = require('./Supplier');
const SupplierSerializer = require('../../Serializer').SupplierSerializer;

router.get('/', async (req, res) => {
    const result = await Supplier.list();

    const contentType = res.getHeader('Content-Type');
    const serializer = new SupplierSerializer(contentType);
    res.send(serializer.serialize(result));
});

router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const supplier = new Supplier({id});
        await supplier.load();

        const contentType = res.getHeader('Content-Type');
        const serializer = new SupplierSerializer(contentType);
        res.send(serializer.serialize(supplier));
    } catch(err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try{
        const supplier = new Supplier(req.body);
        await supplier.create();

        const contentType = res.getHeader('Content-Type');
        const serializer = new SupplierSerializer(contentType);
        res.status(201).send(serializer.serialize(supplier));
    } catch(err) {
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const supplier = new Supplier({id});
        await supplier.update(req.body);
        res.status(204).end();
    } catch(err) {
        next(err);
    }
});

router.delete('/:id', async(req, res, next) => {
    try {
        const id = req.params.id;
        const supplier = new Supplier({id});
        await supplier.delete();
        res.status(204).end();
    } catch (err) {
        next(err);
    }
});

module.exports = router;