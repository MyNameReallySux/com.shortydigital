var _           = require("underscore");
var server      = require('diet');          //Diet Virtual Hosting
var util        = require('util');          //Utilities for Debugging
// Main Domain <www.shortydigital.com>
console.log("Starting com.shortydigital");

/*
var app = server();
app.listen("localhost:81");
app.get('/', function($){
    console.log("In com.shortydigital");
    $.header('status', 204);
    $.header('Content Type', 'text/html');

    $.end('You are on www.shortydigital.com port 81');
});
*/

var express = require('express');
var exp = express();

function init() {
    var compression = initModule('compression');
    exp.use(compression());
    console.log(util.inspect(compression));
}

function initModule(name){
    try {
        return require(name);    
    } catch (ex) {
        console.log("Module '" + name + "' could not be found. Maybe it is not installed.");
        installModule(name);
    }
}

function installModule(name){
    var mods = {
        compression:    "compression",
        express:        "express"
    }
    
    if(isSet(mods[name])){
        var exec = require('child_process').exec;
        var cmd = 'npm install ' + mods[name];
        exec(cmd, function(error, stdout, stderr) {
              // command output is in stdout
            console.log("Module Installed");
        });    
    }
    
}
    
function isSet(variable){
        return typeof variable != undefined && variable !== null;
}

init();


