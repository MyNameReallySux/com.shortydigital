var express = require('express');
var Provider = require('../scripts/driver').Provider;
var Posts = new Provider('posts', ['tag']);
var utils = require('../scripts/utils');

/* GET blog page. */
this.init = function(app, args){
    args.admin = true;

    /* #########################
        GET Requests
        
        /blog
        /blog/new
        /blog/:id
        /blog/:id/edit
        /blog/:tag
    ######################### */
    
    app.get('/blog', function(req, res, next) {
        console.log("Loading /" + args.name);  
        Posts.findAllPosts(function(error, posts){
            posts.forEach(function(post){
                post.snippet = post.body.shortenBy('words', 50);
            });
            res.render('blog', {
                title: args.title,
                admin: args.admin,
                posts: posts
                
            });
        });
    });
    
    app.get('/blog/new', function(req, res, next) {
        console.log("Loading /" + args.name + "/new");
        res.render('blog-post-edit', {
            title: args.title + ' > New Post',
            admin: args.admin
        });
    }); 
    
    app.get('/blog/:id(\\d+)', function(req, res, next) {
        //:id Paramater : req.params.id;
        console.log("Loading /" + args.name + "/" + req.params.id);
        Posts.findPostById(req.params.id, function(error, post){
            res.render('blog-post', {
                title: args.title,
                admin: args.admin,
                post: post
                
            });
        });
    });
    
    app.get('/blog/:id(\\d+)/edit', function(req, res, next) {
        //:id Paramater : req.params.id;
        console.log("Loading /" + args.name + "/" + req.params.id  + "/edit");
        Posts.findPostById(req.params.id, function(error, post){
            res.render('blog-post-edit', {
                title: args.title + " > Edit Post",
                admin: args.admin,
                post: post
            });
        });
    });
    
    app.get('/blog/:id(\\d+)/delete', function(req, res, next) {
        //:id Paramater : req.params.id;
        console.log("Loading /" + args.name + "/" + req.params.id + "/delete");
        Posts.findPostById(req.params.id, function(error, post){
            res.render('blog-post-delete', {
                title: args.title,
                admin: args.admin,
                post: post
            });
        });
    });
    
    app.get('/blog/:tag', function(req, res, next) {
        //:id Paramater : req.params.id;
        console.log("Loading /" + args.name + "/" + req.params.id);
        Posts.findAllPostsByTag(req.params.tag, function(error, posts){
            res.render('blog', {
                title: args.title,
                admin: args.admin,
                posts: posts
            });
        });
    });
    
    /* #########################
        POST Requests
        
        /blog/new
    ######################### */
    
    app.post('/blog/new', function(req, res){
        Posts.save('post', {
            title:  req.body.title,
            author: req.body.author,
            body:   req.body.body
        }, function(error, post) {
            res.redirect('/blog/' + post._id);
        });
    });
    
    app.post('/blog/:id(\\d+)/edit', function(req, res, next) {
        Posts.save('post', {
            _id:    req.params.id,
            title:  req.body.title,
            author: req.body.author,
            body:   req.body.body
        }, function(error, post) {
            res.redirect('/blog/'+req.params.id);
        });
    });
}

module.exports = this;