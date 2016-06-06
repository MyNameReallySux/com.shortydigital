var utils = require("./utils");

idCounter = {
    post: 1,
    author: 1
}

/**
 * Constructor for new data-type provider. Provider grants access to read and modify data-type via findAll(), findById(), save(), etc.
 * @author Chris Coppola <mynamereallysux@gmail.com>
 * @param       {string}     type      Pass type to create custom methods for data-type and retrieval method.
 *                                          findAll(type, callback) => findAll{type(s)}(callback)
 *                                          findById(type, id, callback) = find{type}ById(id, callback);
 *                                          ex: findAllPosts(...), findPostById(1, ...)
 */

Provider = function(type, params){
    if(isSet(type)){
        var type = this.type = type.singularize().capitalize();
        var findAllfcn = 'findAll'+type.pluralize();
        var findByIdfcn = 'find'+type+'ById';
        var self = this;
          
        this[findAllfcn] = function(callback){
            this.findAll(type.toLowerCase(), callback);
        }
        this[findByIdfcn] = function(id, callback){
            this.findById(type.toLowerCase(), id, callback);
    	}
        
        var self = this;
        
        if(isSet(params) && isArray(params)){
            params.forEach(function(param){
                var findAllByParamFcn = 'findAll'+type.pluralize()+'By'+param.capitalize();
                self[findAllByParamFcn] = function(value, callback){
                    self.findAllByParam(type, param, value, callback);
                }
            });
        }      
        
    } else {
        type = 'NoModel';
    }
};

Provider.prototype.dummyData = {};
Provider.prototype.dummyData.posts = [];
Provider.prototype.dummyData.authors = [];

/**
 * Finds all (up to query limit) records of specified data type.
 * @author Chris Coppola <mynamereallysux@gmail.com>
 * @param     {string}       type         Which type of data to retrieve from database. ex: posts, articles
 * @param     {function}     callback     Function which runs after completion. Passes error (null if no errors) and data (in json form) params                                   
 */

Provider.prototype.findAll = function(type, callback) {
    /* ################################
        Test if able to connect to DB
        Retrieve & Process Data
    ################################ */    
    var collection;
    if(type.isEquivalentTo('post'))           collection = this.dummyData.posts;
    else if(type.isEquivalentTo('author'))    collection = this.dummyData.authors;

    var index = 0;
    collection.forEach(function(record){
        record._index = index++;
    })
    
    if(collection) {
        callback(null, collection);
    } else {
        callback({
            msg: "A connection to the Database could not be made.",
            caller: this.name,
            args: arguments
        });
    }
}.bind(Provider.prototype);

/*
Provider.prototype.findAllByTag = function(type, tag, callback) {
    var data = [];

    this.dummyData.forEach(function(record){
        var tags = []; 
        record.tags.forEach(function(tag){
            tags.push(tag.toLowerCase());
        });
        if(tags.indexOf(tag.toLowerCase()) != -1){
            data.push(record);
        }
    });
    if(data)
        callback(null, data);
    else 
        callback({
            msg: "No data was found. Using type '" + type 
                    + "' and " + key + " '" + value + "'.",
            caller: this.name,
            args: arguments
    });
}.bind(Provider.prototype);*/

// findAllByParam('posts', 'tag', 'coding', ...)
Provider.prototype.findAllByParam = function(type, key, value, callback) {
    /* ################################
        Test if able to connect to DB
    ################################ */
    var collection;
    if(type.isEquivalentTo('post'))           collection = this.dummyData.posts;
    else if(type.isEquivalentTo('author'))    collection = this.dummyData.authors;
    
    if(!collection)  
        callback({
            msg: "A connection to the Database could not be made.",
            caller: this.name,
            args: arguments
    });
    /* ################################
        Retrieve & Process data
    ################################ */
    var data = [];
    var index = 0;
    collection.forEach(function(record){
        record._index = index++;
        
        if(isSet(record[key.pluralize()])){
            var subrecord = record[key.pluralize()];
            if(isArray(subrecord)){
                subrecord.forEach(function(param){
                    if(isString(param) && param.toLowerCase() == value.toLowerCase()){
                        data.push(record);
                    /* } else if (isNum(param) && param == value){
                        data.push(record);
                    } else if (isBool(param) && param == value){
                        data.push(record); */
                    } 
                });
            } else if(isObject(subrecord)){
                subrecord.forEach(function(param){
                    if(isString(param) && param.toLowerCase() == value.toLowerCase()){
                        data.push(record);
                    /* } else if (isNum(param) && param == value){
                        data.push(record);
                    } else if (isBool(param) && param == value){
                        data.push(record); */
                    } 
                });
            } else {
                if(isString(param) && param.toLowerCase() == value.toLowerCase()){
                    data.push(record);
                /* } else if (isNum(param) && param == value){
                    data.push(record);
                } else if (isBool(param) && param == value){
                    data.push(record); */
                } 
            }
        }
    });
    /* ################################
        Test if data was retrieved
    ################################ */
    if(data)
        callback(null, data);
    else 
        callback({
            msg: "No data was found. Using type '" + type 
                    + "' and " + key + " '" + value + "'.",
            caller: this.name,
            args: arguments
    });
}.bind(Provider.prototype);

/**
 * Finds a single record with the given id.
 * @author Chris Coppola <mynamereallysux@gmail.com>
 * @param     {string}       type         Which type of data to retrieve from database. ex: posts, articles
 * @param     {number}       id           Id of record to retrieve from database
 * @param     {function}     callback     Function which runs after completion. Passes error (null if no errors) and data (in json form) params                                   
 */
Provider.prototype.findById = function(type, id, callback) {
    /* ################################
        Test if able to connect to DB
    ################################ */
    var collection;
    if(type.isEquivalentTo('post'))           collection = this.dummyData.posts;
    else if(type.isEquivalentTo('author'))    collection = this.dummyData.authors;
    
    if(!collection)  
        callback({
            msg: "A connection to the Database could not be made.",
            caller: this.name,
            args: arguments
    });
    /* ################################
        Retrieve & Process data
    ################################ */
    var data = null;
    collection.forEach(function(record){
        if(record._id == id){
            data = record;
            return;
        }
    });
    /* ################################
        Test if data was retrieved
    ################################ */
    if(data)
        callback(null, data);
    else 
        callback({
            msg: "No data was found. Using type '" + type 
                    + "' and " + key + " '" + value + "'.",
            caller: this.name,
            args: arguments
    });
}.bind(Provider.prototype);

/**
 * Saves the given data to the database. Either updates existing data or creates a new record.
 * @author Chris Coppola <mynamereallysux@gmail.com>
 * @param     {string}       type         Which type of data to retrieve from database. ex: posts, articles
 * @param     {object}       data         The data to be saved to the database. Can be a single object or an array of objects
 * @param     {function}     callback     Function which runs after completion. Passes error (null if no errors) and data (in json form) params                                   
 */
Provider.prototype.save = function(type, data, callback) {
    type = type.singularize();
    if(typeof(data.length) == "undefined") data = [data];
    
    var collection;
    if(type.isEquivalentTo('post'))           collection = this.dummyData.posts;
    else if(type.isEquivalentTo('author'))    collection = this.dummyData.authors;

    data.forEach(function(record){
        record.created_at = new Date();
        if(!record._id) record._id = idCounter[type]++;   
        if(record.comments === undefined) record.comments = [];
        
        record.comments.forEach(function(comment){
            comment.created_at = new Date();
        });
        collection[record._id - 1] = record;
    });
    /*
    for(var i = 0; i < data.length; i++) {
        post = data[i];
        
        post.created_at = new Date();

        if(!post._id) post._id = postCounter++;             
        if(post.comments === undefined) post.comments = [];

        for(var j =0;j< post.comments.length; j++) {
            post.comments[j].created_at = new Date();
        }
        this.dummyData[this.dummyData.length] = post;
    }*/
    if(data.length == 1) data = data[0];

    callback(null, data);
}.bind(Provider.prototype);

/* Lets bootstrap with dummy data */

var Posts = new Provider();
var Authors = new Provider();

/*
provider.findById('post', 1, function(error, data){
    console.dir(data);
});
provider.findAll('posts', function(error, data){
    console.dir(data);
});
provider.findAllByTag('posts', 'coding', function(error, data){
    console.dir(data);
});
*/


Authors.save('authors', [
    { 
        name: 'Chris Coppola', 
        email: 'mynamereallysux@gmail.com'
    }
], function(error, data){});

Posts.save('post', [
    { 
        title: 'Creating a simple server using Node.js & Express', 
        author: 'Chris Coppola',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eleifend nunc eu dolor scelerisque, eu elementum nisi sodales. Aenean faucibus accumsan ligula, non ornare augue finibus tristique. Nullam pellentesque et orci vitae tempor. Nullam in purus lacinia libero aliquam placerat. Nulla eleifend cursus nunc, id imperdiet justo molestie nec. Morbi sem metus, hendrerit et purus vel, fringilla eleifend ante. Proin feugiat laoreet nisl, vel rhoncus sem venenatis a. Aenean risus lacus, tristique eu turpis quis, vehicula blandit nunc. Vestibulum in elementum risus. Cras metus purus, dapibus in justo eu, dignissim fringilla justo. Vestibulum sed neque quis lorem tempor iaculis.', 
        tags: ['Coding', 'Node', 'Express'],
        comments:[
          { author:'Bob',   comment:'I love it' },
          { author:'Dave',  comment:'This is rubbish!' }
      ]
    }, 
    { 
        title: 'Using a Database with Node.js & Express', 
        author: 'Chris Coppola',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eleifend nunc eu dolor scelerisque, eu elementum nisi sodales. Aenean faucibus accumsan ligula, non ornare augue finibus tristique. Nullam pellentesque et orci vitae tempor. Nullam in purus lacinia libero aliquam placerat. Nulla eleifend cursus nunc, id imperdiet justo molestie nec. Morbi sem metus, hendrerit et purus vel, fringilla eleifend ante. Proin feugiat laoreet nisl, vel rhoncus sem venenatis a. Aenean risus lacus, tristique eu turpis quis, vehicula blandit nunc. Vestibulum in elementum risus. Cras metus purus, dapibus in justo eu, dignissim fringilla justo. Vestibulum sed neque quis lorem tempor iaculis.',
        tags: ['Coding', 'Node', 'Express', 'MongoDB'],
    },
    {   
        title: 'Creating a grid system using SCSS',
        author: 'Chris Coppola',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eleifend nunc eu dolor scelerisque, eu elementum nisi sodales. Aenean faucibus accumsan ligula, non ornare augue finibus tristique. Nullam pellentesque et orci vitae tempor. Nullam in purus lacinia libero aliquam placerat. Nulla eleifend cursus nunc, id imperdiet justo molestie nec. Morbi sem metus, hendrerit et purus vel, fringilla eleifend ante. Proin feugiat laoreet nisl, vel rhoncus sem venenatis a. Aenean risus lacus, tristique eu turpis quis, vehicula blandit nunc. Vestibulum in elementum risus. Cras metus purus, dapibus in justo eu, dignissim fringilla justo. Vestibulum sed neque quis lorem tempor iaculis.',
        tags: ['Design', 'CSS', 'SCSS'],
    },
    {
        title: 'Understanding Einsteins field Equations',
        author: 'Chris Coppola',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eleifend nunc eu dolor scelerisque, eu elementum nisi sodales. Aenean faucibus accumsan ligula, non ornare augue finibus tristique. Nullam pellentesque et orci vitae tempor. Nullam in purus lacinia libero aliquam placerat. Nulla eleifend cursus nunc, id imperdiet justo molestie nec. Morbi sem metus, hendrerit et purus vel, fringilla eleifend ante. Proin feugiat laoreet nisl, vel rhoncus sem venenatis a. Aenean risus lacus, tristique eu turpis quis, vehicula blandit nunc. Vestibulum in elementum risus. Cras metus purus, dapibus in justo eu, dignissim fringilla justo. Vestibulum sed neque quis lorem tempor iaculis.', 
        tags: ['Science', 'Math', 'Physics', 'Calculus'],
    }
], function(error, data){});

exports.Provider = Provider;