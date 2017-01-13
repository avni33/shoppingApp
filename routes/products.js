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



router.post('/', function(req, res, next) {
    console.log("in post:");
    console.log(req.body);
    console.log("end of in post:");
    var postdata = req.body;
    if(Array.isArray(postdata)){
        postdata.forEach(function(item,index){
            console.log("in postpostdataSet[0]");
            console.log(postdata[0]);
            var saveObj = new productFromDb(item);
            console.log("save obj");
            console.log(saveObj);
            saveObj.save(function(err, resp) {
                console.log("in post.response data");
                console.log(resp);
                console.log("in post.insert error");
                console.log(err);
                if (err) {
                    return next(err);
                }
            });
        });
    }else if(typeof postdata == 'object'){
        console.log("in post: is an object");
        var saveObj = new productFromDb(postdata);
        console.log("save obj");
        console.log(saveObj);
        saveObj.save(function(err, resp) {
            console.log("in post.resp data");
            console.log(resp);
            console.log("in post.insert error");
            console.log(err);
            if (err) {
                return next(err);
            }
        });

    }else{
        console.log("in post: is something else");
        return next({});
    }
    res.json({});
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
