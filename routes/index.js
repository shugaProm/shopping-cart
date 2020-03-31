const express = require('express');
const router = express.Router();

const Cart = require('../models/cart');
const Product = require('../models/product');


// GET home page
router.get('/', (req, res, next) => {
    Product.find( (err, docs) => {
        let productChunks = [];
        let chunkSize = 3;
        for (let i = 0; i < docs.length; i += chunkSize) {
            productChunks.push(docs.slice(i, i + chunkSize));
        }
        res.render('shop/index', { title: 'Shopping-Cart Home', products: productChunks,});
    });
});

router.get('/add-to-cart/:id', (req, res, next) => {
    let productId = req.params.id;
    // check if cart already exists in the session
    let cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

    Product.findById(productId, function(err, product) {
        if (err) {
            return res.redirect('/');
        }
        cart.add(product, product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/');
    });
});

router.get('/shopping-cart/', (req, res, next) => {
    // if there isn't any current cart session
    if (!req.session.cart) {
        return res.render('shop/shopping-cart', {products: null});
    }
    // if there is a cart session
    let cart = new Cart(req.session.cart);
    res.render('shop/shopping-cart', { products: cart.generateArray(), totalPrice: cart.totalPrice });
});

router.get('/checkout', (req, res, next) => {
    if (!req.session.cart) {
        return res.redirect('shop/shopping-cart');
    }
    let cart = new Cart(req.session.cart);
    res.render('shop/checkout', { total: cart.totalPrice});
});


module.exports = router;
