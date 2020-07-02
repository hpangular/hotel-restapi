const express = require('express');
const router = express.Router();
const Product = require('../model/Product');
const verify = require('./verifyToken');


//GET ALL PRODUCTS
router.get('/', verify, async (req, res) => {
    try {
        const products = await Product.find();
        res.send(products);
    } catch (error) {
        res.status(400).send();
    }
});


//ADDED PRODUCT
router.post('/', async (req, res) => {
    const products = new Product({
        product_name: req.body.product_name,
        product_price: req.body.product_price,
        product_desciption: req.body.product_desciption,
        rating: req.body.rating,
        isSaved: req.body.isSaved,
        thumb_img: req.body.thumb_img
    });
    try {
        const savedProduct = await products.save();
        res.json({
            message: 'Product is succesfully addded...!!',
            id: savedProduct._id
        });
    } catch (error) {
        res.json(
            {
                message: error

            });
    }
});


//GET SINGLE PRODUCT BY _ID
router.get('/:PRODUCT_ID', async (req, res) => {
    try {
        const products = await Product.findById(req.params.PRODUCT_ID);
        res.json({
            data: products
        })
    } catch (error) {
        res.status(400).json(error);
    }
});

//DELETE A PRODUCT
router.delete('/:PRODUCT_ID', async (req, res) => {
    try {
        const products = await Product.remove({ _id: req.params.PRODUCT_ID });
        res.json({
            message: 'Delete a product with' + products.req.params.PRODUCT_ID
        });
    } catch (error) {
        res.status(400).json(error);
    }
});


//ADDED PRODUCT
router.patch('/:PRODUCT_ID', async (req, res) => {
    const products = new Product({
        product_name: req.body.product_name,
        product_price: req.body.product_price,
        product_desciption: req.body.product_desciption,
        rating: req.body.rating,
        isSaved: req.body.isSaved,
        thumb_img: req.body.thumb_img
    });
    try {
        const updatedProduct = await products.updateOne({ _id: req.params.PRODUCT_ID }, { $set: products });
        res.json({
            message: 'Succefully updated Products',
            data: updatedProduct
        });
    } catch (error) {
        res.json(
            {
                message: error

            });
    }
});


module.exports = router;