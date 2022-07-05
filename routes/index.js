var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var path = require('path');

/* GET home page. */
router.get('/', function (req, res, next) {
  Product.find(function (err, docs) {
    res.render('shop/index', { title: 'TechBuy', active: { home: true }, products: docs});
  }).lean();
});
router.get('/home', function (req, res, next) {
  Product.find(function (err, docs) {
    res.render('shop/index', { title: 'TechBuy', active: { home: true }, products: docs});
  }).lean();
});

/* GET product page. */
router.get('/product', function (req, res, next) {
  res.render('shop/product', { title: 'TechBuy' });
});

/* GET laptop page. */
router.get('/laptops', function (req, res, next) {
  Product.find({categories: 'Laptops'}, function (err, docs) {
    res.render('shop/laptops', { title: 'TechBuy', active: { laptops: true }, products: docs});
  }).lean();
});

/* GET desktops page. */
router.get('/desktops', function (req, res, next) {
  Product.find({categories: 'Desktops'}, function (err, docs) {
    res.render('shop/desktops', { title: 'TechBuy', active: { desktops: true }, products: docs});
  });
});

/* GET accessories page. */
router.get('/accessories', function (req, res, next) {
  res.render('shop/accessories', { title: 'TechBuy', active: { accessories: true } });
});

/* GET admin-dashboard page. */
router.get('/admin', function (req, res, next) {
  res.render('admin/dashboard', { title: 'TechBuy' });
});

/* GET admin-customers page. */
router.get('/admin/customers', function (req, res, next) {
  res.render('admin/customers', { title: 'TechBuy' });
});

/* GET admin-products page. */
router.get('/admin/products', function (req, res, next) {
  Product.find(function (err, docs) {
    res.render('admin/products', { title: 'TechBuy', products: docs });
  }).lean();
});

/* GET admin-orders page. */
router.get('/admin/orders', function (req, res, next) {
  res.render('admin/orders', { title: 'TechBuy' });
});

router.get('/admin/addProduct', function (req, res, next) {
    res.render('admin/addProduct', { title: 'TechBuy'})
  });

router.post('/admin/addProduct', (req, res) => {
  var products = new Product({
    image: req.body.image,
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category
  });

  products.save((err, result) => {
    if(err) {
      res.redirect('../admin/addProduct');
    }
    res.redirect('../admin/products' );
  });
});

router.get('/product/:id', function (req, res, next) {
  var productId = req.params.id;
  Product.findById(productId, function (err, docs) {
    res.render('shop/product', { title: 'TechBuy', active: { home: true }, products: docs});
  }).lean();
});


module.exports = router;
