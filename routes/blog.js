var express = require('express');
var Provider = require('../scripts/driver').Provider;
var Posts = new Provider('posts');
var utils = require('../scripts/utils');

/* GET blog page. */
this.init = function(app, args){
    app.get('/blog', function(req, res, next) {
        console.log("Loading /" + args.name);
        Posts.findAllPosts(function(error, posts){
            res.render('blog', {
                title: args.title,
                posts: posts
            });
        });
    });
}

module.exports = this;