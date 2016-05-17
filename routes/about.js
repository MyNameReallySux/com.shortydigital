var express = require('express');

/* GET about page. */
this.init = function(app, args){
    app.get('/about', function(req, res, next) {
        console.log("Loading /" + name);
        res.render('about', {
            title: args.title
        });
    });
}

module.exports = this;