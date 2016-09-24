var express = require('express');

/* GET about page. */
this.init = function(app, args){
    app.get('/about', function(req, res, next) {
        console.log("Loading /" + args.name);
        res.render('about', {
            title: args.title,
            admin: args.admin,
            site: args.site,
            page: args.page
        });
    });
}

module.exports = this;