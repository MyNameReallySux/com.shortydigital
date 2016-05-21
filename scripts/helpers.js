var utils = require('./utils');
var Handlebars = require('handlebars');
this.configHandlebars = function(handlebars){
    /* ###########################
        Container Helper
    ########################### */
    Handlebars.registerHelper('container', function(options){        
        return createCSSBlockHelper('div', options, {
            class: 'container'
        })
    });
    /* ###########################
        Row Helper
    ########################### */
    Handlebars.registerHelper('row', function(options){    
        return createCSSBlockHelper('div', options, {
            class: 'row'
        })
    });
    
    /* ###########################
        Col Helper
    ########################### */
    Handlebars.registerHelper('col', function(options){    
        return createCSSBlockHelper('div', options, {
            class: 'col'
        })
    });
}

function createCSSBlockHelper(elem, options, defaults){
    options.hash = setDefaults(options.hash, defaults);
    console.dir(options.hash, logopts);
 
    var attributes = generateAttributes(options);

    return new Handlebars.SafeString(
        '<'+ elem + ' ' + attributes + '>' + options.fn(this) + '</' + elem + '>'
    );
}

function setDefaults(options, defaults){
    console.dir('Setting Defaults...', logopts);
    for(var attr in defaults) {
        if(isSet(options[attr])) 
           options[attr] = defaults[attr] + ' ' + options[attr];   
        else 
           options[attr] = defaults[attr];
        console.dir(options[attr], logopts);
    }
    
    return options;
}

function generateAttributes(options){
    var attributes = [];
    if(options.hash == 'undefined' || options.hash.length == 0) return '';
    for(var attributeName in options.hash) {
        attributes.push(attributeName + '="' + options.hash[attributeName] + '"');
    }
    return attributes.join(' ');
}

module.exports = this;