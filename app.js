/* ##########################

########################## */
// Node Modules | https://nodejs.org/api
var util            = require('util');                  // Utilites for inspecting  | https://nodejs.org/api/util.html
var path            = require('path');                  // Set and read file paths  | https://nodejs.org/api/path.html
var fs              = require('fs');                    // File system              |

// Installed Modules
var _               = require('underscore');            // The JQuery of node.js    |
var express         = require('express');               // Simple router            |
var compression     = require('compression');           // Enable gZip compression  |
var handlebars      = require('express-handlebars');    // Template engine          |
var logger          = require('morgan');                // Logger                   |
var cookieParser    = require('cookie-parser');         // Parse cookies            |
var bodyParser      = require('body-parser');           // Parse html               |
var favicon         = require('serve-favicon');         // Serves favicon           |

var app = express();

// prototype functions
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

// main domain <www.shortydigital.com>
var package = "com.shortydigital";
var domain = "shortydigital.com";
var name = "Shorty Digital"

console.log("Starting " + package);
// set application config
app.set('port', process.env.port || 4000);
app.use(compression());
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
    extended: false
}));
app.use(cookieParser());
app.use(logger('dev'));

// set view engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars({
    defaultLayout: 'master'
}));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public'), { 
    dotfiles: 'ignore', 
    etag: false,
    extensions: ['htm', 'html'],
    index: false}
));

// set up router
var routes = 'routes';
var files = fs.readdirSync(routes);

files.forEach(function(file){
    var filePath = './' + routes + "/" + file;
    var routeName = path.basename(filePath, ".js")
    var routeName = routeName.toString();
    var routeName = routeName.capitalize();
    console.log(filePath);
    route = require(filePath);
    route.init(app, {
        "title" : name + " | " + routeName,
        "name"  : routeName,
        "site"  : name
    });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


app.listen(app.get('port'));
console.log("Listening on port " + app.get('port'));


module.exports = app;

/* ##########################
    Local Functions
########################## */
function isSet(variable){
    return (typeof variable != undefined)
        && variable !== null 
        && variable != ''
        && variable != undefined;
}

function configHandlebars(){
    handlebars.registerHelper('container', function(options){
        
    })
}
// Removed Code
{
/*
// Development specific variables
app.configure('development', function(){
  app.use(express.errorHandler());
});

// Production specific variables
app.configure('production', function(){

});
*/
/*
var app = require('diet');

var app = server();
app.listen("localhost:81");
app.get('/', function($){
    console.log("In com.shortydigital");
    $.header('status', 204);
    $.header('Content Type', 'text/html');

    $.end('You are on www.shortydigital.com port 81');
});
*/
/*
function initModule(name, success, failure){
    try {
        var module = require(name);
        if(_.isFunction(success)){
            success(module);
        }
    } catch (ex) {
        console.log("Module '" + name + "' could not be found. Maybe it is not installed.");
        installModule(name);
        if(_.isFunction(failure)){
            failure(module);
        }
    }
}

function installModule(name){
    var mods = {
        compression:    "compression",
        express:        "express"
    }
    
    if(isSet(mods[name])){
        var modCmd = mods[name];
        process.stdin.write(new Buffer('npm install ' + modCmd + ' --save'));
        
        var processTag = 'install_' + name;
        var child = createChildProcess(processTag);
        console.log(name + " module is set. Running 'npm install " + modCmd + " --save'");
        child.stdin.write('npm install " + modCmd + " --save');

        
        var child = require('child_process').exec;
        var cmd = 'npm install ' + mods[name];
    }
    
}

function createChildProcess(name){
    var spawn = childProcess.spawn;
    var exec = childProcess.exec;
    
    var child = spawn('cmd', ['/K'], {cwd: './'});
    var pid = child.pid;
    var processTag = isSet(name) ? name.toUpperCase() : '';
    
    child.stdin.setEncoding = 'utf-8';

    child.stdout.on('data', function(data){
        console.log(data.toString());
    });
    
    var subConsole = new Console(child.stdout, child.stderr);
  
    return child;
}
*/
}


