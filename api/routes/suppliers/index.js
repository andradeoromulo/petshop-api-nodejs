const router = require('express').Router();
const productsRouter = require('./products/index');
const Supplier = require('./Supplier');
const SupplierSerializer = require('../../Serializer').SupplierSerializer;

// Middleware for supplier existence verification
const verifySupplierExistence = async (req, res, next) => {
    try {
        const id = req.params.supplierId;
        const supplier = new Supplier({ id: id });
        await supplier.load();
        req.supplier = supplier;
        next();
    } catch(err) {
        next(err);
    }
}

router.get('/', async (req, res) => {
    const result = await Supplier.list();

    const contentType = res.getHeader('Content-Type');
    const serializer = new SupplierSerializer(contentType);
    res.send(serializer.serialize(result));
});

router.get('/:supplierId', async (req, res, next) => {
    try {
        const id = req.params.supplierId;
        const supplier = new Supplier({id});
        await supplier.load();

        const contentType = res.getHeader('Content-Type');
        const serializer = new SupplierSerializer(
            contentType,
            ['createdAt', 'updatedAt', 'version']
        );
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

router.put('/:supplierId', async (req, res, next) => {
    try {
        const id = req.params.supplierId;
        const supplier = new Supplier({id});
        await supplier.update(req.body);
        res.status(204).end();
    } catch(err) {
        next(err);
    }
});

router.delete('/:supplierId', async(req, res, next) => {
    try {
        const id = req.params.supplierId;
        const supplier = new Supplier({id});
        await supplier.delete();
        res.status(204).end();
    } catch (err) {
        next(err);
    }
});

router.use('/:supplierId/products', verifySupplierExistence, productsRouter);

module.exports = router;