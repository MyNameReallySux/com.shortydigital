var express = require('express');

/* GET home page. */
this.init = function(app, args){
    app.get('/', function(req, res, next) {
        console.log("Loading /" + args.name);
        res.render('index', {
            title: args.title
        });
    });
}

module.exports = this;