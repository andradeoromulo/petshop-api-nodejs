const router = require('express').Router({ mergeParams: true }); //merge params so we can access params from the previous router 
const Product = require('./Product');
const ProductSerializer = require('../../../Serializer').ProductSerializer;

router.options('/', (req, res) => {
    res.set('Access-Control-Allow-Methods', 'GET, POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.end();
});

router.get('/', async (req, res) => {
    const productsList = await Product.list(req.params.supplierId);
    const serializer = new ProductSerializer(res.getHeader('Content-Type'));
    res.send(serializer.serialize(productsList));
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
        const timestamp = (new Date(product.updatedAt)).getTime();
        res.set('ETag', product.version);
        res.set('Last-Modified', timestamp);
        res.set('Location', `/api/suppliers/${product.supplier}/products/${product.id}`);
        res.status(201).send(serializer.serialize(product));
    } catch(err) {
        next(err);
    }
});

router.options('/:productId', (req, res) => {
    res.set('Access-Control-Allow-Methods', 'GET, PUT, HEAD, DELETE');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.end();
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
        const timestamp = (new Date(product.updatedAt)).getTime();
        res.set('ETag', product.version);
        res.set('Last-Modified', timestamp);
        res.send(serializer.serialize(product));
    } catch(err) {
        next(err);
    }
});

router.head('/:productId/', async (req, res, next) => {
    try {
        const data = {
            id: req.params.productId,
            supplier: req.supplier.id
        };

        const product = new Product(data);
        await product.load();

        const timestamp = (new Date(product.updatedAt)).getTime();
        res.set('ETag', product.version);
        res.set('Last-Modified', timestamp);
        res.status(200).end();
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
        await product.load();

        const timestamp = (new Date(product.updatedAt)).getTime();
        res.set('ETag', product.version);
        res.set('Last-Modified', timestamp);
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

router.options('/:productId/decrease-quantity', (req, res) => {
    res.set('Access-Control-Allow-Methods', 'POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.end();
});

router. post('/:productId/decrease-quantity', async (req, res, next) => {
    try {
        const data = {
            id: req.params.productId,
            supplier: req.supplier.id
        }

        const product = new Product(data);
        await product.load();
        await product.decreaseQuantity(req.body.quantity);
        await product.load();

        const timestamp = (new Date(product.updatedAt)).getTime();
        res.set('ETag', product.version);
        res.set('Last-Modified', timestamp);
        res.status(204).end();
    } catch(err) {
        next(err);
    }
});


module.exports = router;