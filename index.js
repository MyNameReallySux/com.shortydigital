/* ##########################

########################## */
// Node Modules | https://nodejs.org/api
var util            = require('util');          // Utilites for inspecting  | https://nodejs.org/api/util.html
var path            = require('path');          // Set and read file paths  | https://nodejs.org/api/path.html
// Installed Modules
var _               = require("underscore");    // The JQuery of node.js    |
var express         = require("express");       // Simple router            |

// Main Domain <www.shortydigital.com>
var name = "com.shortydigital";
console.log("Starting " + name);

var express = require('express');
var app = express();

process.env.port = 80;

// Set application port
app.listen(process.env.port)
console.log("Listening on port " + process.env.port);

/*
// Development specific variables
app.configure('development', function(){
  app.use(express.errorHandler());
});

// Production specific variables
app.configure('production', function(){

});
*/

/* ##########################
    Local Functions
########################## */
function isSet(variable){
        return (typeof variable != undefined)
            && variable !== null 
            && variable != ''
            && variable != undefined;
}

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
    


