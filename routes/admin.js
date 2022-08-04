var express = require('express');
var router = express.Router();
var session = require('express-session');

/* GET admin-dashboard page. */
router.get('/dashboard', isLoggedIn, function (req, res, next) {
    var sess = req.session;
    if(sess.username) {
        res.render('admin/dashboard', { title: 'TechBuy' });
    }
});

router.get('/logout', isLoggedIn, function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/admin', {title: 'TechBuy'});
    });
  });

router.use('/admin', notLoggedIn, function (req, res, next) {
    next();
});

/* GET admin-customers page. */
router.get('/customers', isLoggedIn, function (req, res, next) {
    var sess = req.session;
    if(sess.username) {
        res.render('admin/customers', { title: 'TechBuy' });
    }
});
  
/* GET admin-orders page. */
router.get('/orders', isLoggedIn, function (req, res, next) {
    var sess = req.session;
    if(sess.username) {
        res.render('admin/orders', { title: 'TechBuy' });
    }
});

/* GET admin-products page. */
router.get('/products', isLoggedIn, function (req, res, next) {
    var sess = req.session;
    if(sess.username) {
        res.render('admin/products', { title: 'TechBuy' });
    }
});

router.get('/', function (req, res, next) {
    res.render('admin/admin', { title: 'TechBuy' });
});

router.post('/', function(req, res, next) {
        var sess = req.session;
        sess.username = req.body.username;
        sess.password = req.body.password;
        if(sess.username==="admin" && sess.password==="admin") {
            res.render('admin/dashboard');
        }
});

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.session.username) {
        return next();
    }
    res.redirect('/admin');
  }

  function notLoggedIn(req, res, next) {
    if (!req.session.username) {
        return next();
    }
    res.redirect('/admin');
  }