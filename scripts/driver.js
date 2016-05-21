var utils = require("./utils");

var postCounter = 1;

/**
 * Constructor for new data-type provider. Provider grants access to read and modify data-type via findAll(), findById(), save(), etc.
 * @author Chris Coppola <mynamereallysux@gmail.com>
 * @param       {string}     type      Pass type to create custom methods for data-type and retrieval method.
 *                                          findAll(type, callback) => findAll{type(s)}(callback)
 *                                          findById(type, id, callback) = find{type}ById(id, callback);
 *                                          ex: findAllPosts(...), findPostById(1, ...)
 */
Provider = function(type){
    if(isSet(type)){
        type = this.type = type.capitalize().singularize();
        var findAllfcn = 'findAll'+type.pluralize();
        var findByIdfcn = 'find'+type+'ById';

        this[findAllfcn] = function(callback){
            this.findAll(this.type, callback);
        }
        this[findByIdfcn] = function(id, callback){
            this.findById(type, id, callback);
    	}
    } else {
        type = 'NoModel';
    }
};

Provider.prototype.dummyData = [];
/**
 * Finds all (up to query limit) records of specified data type.
 * @author Chris Coppola <mynamereallysux@gmail.com>
 * @param     {string}       type         Which type of data to retrieve from database. ex: posts, articles
 * @param     {function}     callback     Function which runs after completion. Passes error (null if no errors) and data (in json form) params                                   
 */
Provider.prototype.findAll = function(type, callback) {
  callback(null, this.dummyData);
}.bind(Provider.prototype);

/**
 * Finds a single record with the given id.
 * @author Chris Coppola <mynamereallysux@gmail.com>
 * @param     {string}       type         Which type of data to retrieve from database. ex: posts, articles
 * @param     {number}       id           Id of record to retrieve from database
 * @param     {function}     callback     Function which runs after completion. Passes error (null if no errors) and data (in json form) params                                   
 */
Provider.prototype.findById = function(type, id, callback) {
  var result = null;
  for(var i = 0; i < this.dummyData.length; i++) {
    if(this.dummyData[i]._id == id ) {
      result = this.dummyData[i];
      break;
    }
  }
  callback(null, result);
}.bind(Provider.prototype);

/**
 * Saves the given data to the database. Either updates existing data or creates a new record.
 * @author Chris Coppola <mynamereallysux@gmail.com>
 * @param     {string}       type         Which type of data to retrieve from database. ex: posts, articles
 * @param     {object}       data         The data to be saved to the database. Can be a single object or an array of objects
 * @param     {function}     callback     Function which runs after completion. Passes error (null if no errors) and data (in json form) params                                   
 */
Provider.prototype.save = function(type, data, callback) {
  var post = null;
  if(typeof(data.length) == "undefined") data = [data];

  for(var i =0; i < data.length;i++) {
    post = data[i];
    post._id = postCounter++;
    post.created_at = new Date();

    if(post.comments === undefined) post.comments = [];

    for(var j =0;j< post.comments.length; j++) {
      post.comments[j].created_at = new Date();
    }
    this.dummyData[this.dummyData.length] = post;
  }
  callback(null, data);
}.bind(Provider.prototype);

/* Lets bootstrap with dummy data */
var provider = new Provider();
provider.findById('post', 1, function(error, data){
    console.dir(data);
});
provider.findAll('posts', function(error, data){
    console.dir(data);
});

provider.save('post', [
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