var express = require('express');
var Provider = require('../scripts/driver').Provider;
var Posts = new Provider('posts');
var utils = require('../scripts/utils');

/* GET blog page. */
this.init = function(app, args){
    app.get('/blog', function(req, res, next) {
        console.log("Loading /" + args.name);       
        Posts.findAllPosts(function(error, posts){
            posts.forEach(function(post){
                post.snippet = post.body.shortenBy ('words', 50);
            });
            res.render('blog', {
                title: args.title,
                posts: posts
            });
        });
    });
    
    app.get('/blog/:id', function(req, res, next) {
        //:id Paramater : req.params.id;
        console.log("Loading /" + args.name + "/" + req.params.id);
        Posts.findPostById(req.params.id, function(error, post){
            res.render('blog-post', {
                title: args.title,
                post: post
            });
        });
    });
}

module.exports = this;