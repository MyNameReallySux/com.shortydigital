var express = require('express');
var Provider = require('../scripts/driver').Provider;
var Posts = new Provider('posts', ['tag']);

/* GET home page. */
this.init = function(app, context){
    context.admin = true;
    app.get('/', function(req, res, next) {
        console.log("Loading /" + context.name);
        Posts.findAllPosts(function(error, posts){
            if(posts.length > 3) posts = posts.slice(0, 3);
            posts.forEach(function(post){
                post.snippet = post.body.shortenBy('words', 50);
            });
            res.render('index', {
                context: context,
                posts: posts
                
            });
        });
    });
}

module.exports = this;