const router = require('express').Router({ mergeParams: true }); //merge params so we can access params from the previous router 
const Product = require('./Product');

router.get('/', async (req, res) => {
    const productsList = await Product.list(req.params.supplierId);
    res.send(JSON.stringify(productsList));
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
        res.status(201).send(product)
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