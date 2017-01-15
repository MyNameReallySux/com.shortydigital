var express = require('express');

/* GET about page. */
this.init = function(app, context){
    context.admin = true;
    
    /* #########################
            GET Requests

            /about
            /about/resume
            /about/portfolio
        ######################### */

    app.get('/about', function(req, res, next) {
        console.log("Loading /" + context.name);
        res.render('about', {
            admin: context.admin,
            context: context,
        });
    });
    
    app.get('/about/resume', function(req, res, next) {
        console.log("Loading /" + context.name);
        res.render('about/resume', {
            admin: context.admin,
            context: context,
        });
    });
}

module.exports = this;