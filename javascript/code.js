/* ###############################
    Code.js
############################### */

$(document).ready(function($){
    var codes = $('pre');
    if(codes.length >= 1){
        codes.each(function(i){
            var code = $(this);
            if(code.hasClass("html")){
                highlightHTML(code);
            }
            code.addClass('initialized');     
        });
    }
});

var encoded = [
    { symbol: " ", encode: "nbsp" },
    { symbol: "<", encode: "lt" },
    { symbol: ">", encode: "gt" },
    { symbol: "=", encode: "equals" },
    { symbol: '"', encode: "quot" },
    { symbol: "'", encode: "apos" },                
];  

var codeMap = {
    html: {
        attr:   { className: "attr",   openTag: " ",  closeTag: "=",  dir: "reverse" },
        string: { className: "string", openTag: "\"", closeTag: "\"", dir: "normal"  },
        tag:    { className: "tag",    openTag: "<",  closeTag: ">",  dir: "normal"  }
    }
}


function getHTMLEncoded(string){
    for(var i = 0; i < encoded.length; i++){
        if(encoded[i].symbol == string) return "&" + encoded[i].encode + ";";
    }
    return string;
}

function sliceBetweenTags(html, startTag, endTag, offset){
    if(offset == null || offset == undefined) offset = 0;
    
    var start = html.indexOf(startTag, offset);
    var end = html.indexOf(endTag, start + 1) + endTag.length;
    
    return {
        before: html.slice(0, start),
        content: html.slice(start, end),
        after: html.slice(end)
    }
}

function htmlEncode(element){
    element.text(element.html());
    var replace = function(html){
        html = html.replace(new RegExp('"', 'g'), "&quot;");
        html = html.replace(new RegExp(' ', 'g'), "&nbsp;");
        html = html.replace(new RegExp('=', 'g'), "&equals;");
        return html;
    }(element.html());
    return replace;
}

function highlightHTML(element){
    var html = element.html();
    var txt = htmlEncode(element);
//    txt = highlightHTMLElement(txt, "attr", ' ', '=');
    txt = highlightHTMLElement(txt, "tag", '<', '>');
    txt = highlightHTMLElement(txt, "string", '"', '>');

    element.empty();
    element.html(txt);
    
}
/*

function highlightHTMLElement(html, name){
    var tagSpecs = codeMap.html[name];
    
    var className = tagSpecs.className;
    var startWrap = "<span class='" + className + "'>";
    var endWrap = "</span>"
    
    var startSymbol = tagSpecs.openTag;
    var endSymbol = tagSpecs.closeTag;
    
    var start = html.indexOf(startTag);
    var end = html.indexOf(endTag, start + 1);
}
*/

function highlightHTMLElement(html, type, startSymbol, endSymbol){
    var offset = 0;
    var className = type;
    var startWrap = "<span class='" + className + "'>";
    var endWrap = "</span>"
    
    var startTag = getHTMLEncoded(startSymbol);
    var endTag = getHTMLEncoded(endSymbol);
    
    var start = html.indexOf(startTag);
    var end = html.indexOf(endTag, start + 1);
    while(start > -1 && offset > -1 && offset < 1000){
        var sliced = sliceBetweenTags(html, startTag, endTag, offset);
        html  = sliced.before + startWrap + sliced.content + endWrap + sliced.after;
        offset = html.indexOf(endTag, start);
        
        var start = html.indexOf(startTag, offset);
        var end = html.indexOf(endTag, start);
    }
    return html;
}