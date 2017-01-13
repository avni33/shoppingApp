var express = require('express');
var router = express.Router();

var productFromDb = require('../models/product.js');

/* GET /todos listing. */
router.get('/', function(req, res, next) {
  productFromDb.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

router.get('/:id', function(req, res, next) {
  productFromDb.findById(req.params.id, function(err, productById) {
    if(err) throw err;
    res.render('product', {data : productById});
  });
});


// router.get('/view/:category', function(req, res, next) {
//   console.log(req.params.category);
//   productFromDb.find({'category' : req.params.category}, function (err, products) {
//     if (err) return next(err);
//     console.log(products[0].title);
//     res.render('view', {data : products});
//   });
//});

module.exports = router;
