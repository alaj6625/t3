'use strict'

//
// Set up
//
var config = require('./config.js');
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
var router = express.Router();


console.log("start of prog   2");
router.get('/',function(req,res){
    res.json({"error" : false, "message" : "Hello !"});
    console.log("get");
});

router.get('/fib',function(req,res){
    res.status(403);
    res.json({"error" : false, "message" : "Parameter not supplied"});
    console.log("no value given");

});

router.get('/fib/:id',function(req,res){
    //
    // Set up some variables
    //
    var fib = [];
    var i;
    var nt = 0;
    var t1 = 0;
    var t2 = 1;

    //calculate fibonacci series
    if ( req.params.id < 0) {
        res.status(400);
        res.json({"error" : false, "message" : "The number cannot be negative"});
    } else
    if (req.params.id == 0) {
        fib.push(0);
        res.json(fib);
    }else
    if (req.params.id == 1) {
        fib.push(0);
        fib.push(1);
        res.json(fib);
    } else {
        fib.push(0);
        fib.push(1);
        for (i = 2; i <= req.params.id; ++i) {
            nt = t1 + t2;
            t1 = t2;
            t2 = nt;
            fib.push(nt);
        }
        res.json({"fib" : fib});
    }
});

app.use('/',router);

app.listen(config.port,function(){
    console.log("I am listening at PORT ", config.port);
})