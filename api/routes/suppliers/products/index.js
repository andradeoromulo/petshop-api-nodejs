const router = require('express').Router({ mergeParams: true }); //merge params so we can access params from the previous router 
const Product = require('./Product');
const ProductSerializer = require('../../../Serializer').ProductSerializer;

router.get('/', async (req, res) => {
    const productsList = await Product.list(req.params.supplierId);
    const serializer = new ProductSerializer(res.getHeader('Content-Type'));
    res.send(serializer.serialize(productsList));
});

router.get('/:productId', async (req, res, next) => {
    try {
        const data = {
            id: req.params.productId,
            supplier: req.supplier.id
        };

        const product = new Product(data);
        await product.load();

        const serializer = new ProductSerializer(
            res.getHeader('Content-Type'),
            ['price', 'quantity', 'supplier', 'createdAt', 'updatedAt', 'version']
        );
        res.send(serializer.serialize(product));
    } catch(err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const supplierId = req.supplier.id;
        const body = req.body;
        const data = {
            ...body,
            supplier: supplierId
        }
    
        const product = new Product(data);
        await product.create();
        
        const serializer = new ProductSerializer(res.getHeader('Content-Type'));
        res.status(201).send(serializer.serialize(product));
    } catch(err) {
        next(err);
    }
});

router.put('/:productId', async (req, res, next) => {
    try {
        const data = {
            id: req.params.productId,
            supplier: req.supplier.id
        };

        const product = new Product(data);
        await product.update(req.body);
        res.status(204).end();

    } catch(err) {
        next(err);
    }
});

router.delete('/:productId', async (req, res, next) => {
    try {
        const data = {
            id: req.params.productId,
            supplier: req.supplier.id
        };
    
        const product = new Product(data);
        await product.delete();
        res.status(204).end();
    } catch(err) {
        next(err);
    }
});

module.exports = router;