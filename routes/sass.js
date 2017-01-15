var express = require('express');

/* GET sass page. */
this.init = function(app, args){
    app.get('/sass', function(req, res, next) {
        console.log("Loading /" + args.name);
        res.render('sass', {
            title: args.title,
            admin: args.admin,
            site: args.site,
            page: args.page
        });
    });
}

module.exports = this;