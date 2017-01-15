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
/* ###############################
    Nav.js
############################### */

$(document).ready(function(){
    var nav = $('.nav');
    var menu_btn = nav.find('.menu-btn');
    var nav_menu = nav.find('.menu');
        
    menu_btn.on('click', function(e){   
        setTimeout(function(){
            menu_btn.toggleClass('active');
            nav_menu.toggleClass('open');
        }, 1);
        e.stopPropagation();
    });
    
    $(document).on('click', function(e) {
        closeOpenedSubMenus();
        setTimeout(function(){
            menu_btn.removeClass('active');
            nav_menu.removeClass('open');
        }, 1);
    }); 
    
    var list_items = nav_menu.children('li');
    list_items.each(function(item){
        var menu_dropdown = $(this).find('i');
        var sub_menu = $(this).find('ul');
        menu_dropdown.on('click', function(e){  
            if(!menu_dropdown.hasClass('fa-search')){
                if(menu_dropdown.hasClass('active')){
                    menu_dropdown.removeClass('active');
                    closeOpenedSubMenus();
                } else {
                    closeOpenedSubMenus();
                    setTimeout(function(){
                        menu_dropdown.toggleClass('active');
                        sub_menu.toggleClass('open');
                    }, 1);
                }
                e.stopPropagation();
            }
        });
    });
    
    function closeOpenedSubMenus(){
        var opened = list_items.find('.open')
        opened.each(function(){
            opened.removeClass('open');
        });
    }
});

$(document).ready(function(){
    var menu_btn = $('.menu-btn');
    var close_btn = $('.close-btn');
    menu_btn.click(function(){
        setTimeout(function(){
            var body = $("body");
            body.toggleClass('menu-open');
        }, 1);
    });
    close_btn.click(function(){
        setTimeout(function(){
            $("body").removeClass('menu-open');
        }, 1);
    });
});

function toggleStickyNav(window){
    var scroll = window.scrollTop();
    var stickyNav = $("nav.sticky");
    if(scroll > 40) stickyNav.addClass('active');
    else            stickyNav.removeClass('active');
}

$(document).ready(function(){
    toggleStickyNav($(window));
});


$(window).scroll(function(){
    toggleStickyNav($(this));
});

/* ###############################
    Parallax.js
############################### */

$(document).ready(function(){
    calculateParallaxes();
});

$(window).scroll(function(){
    calculateParallaxes();
});

function calculateParallaxes(){
    var parallaxes = $(".parallax");
    if(parallaxes){
        parallaxes.each(function(){
            calculateParallax($(this))
        });
    }
}

function calculateParallax(parallax){
    if(parallax){
        var height = parallax.height();
        var topPos = parallax.offset().top;
        var bottomPos = topPos + height;
        
        var scrollPos = $(window).scrollTop();

        var minPos = topPos - $(window).height() + (height / 4);
        var maxPos = bottomPos - (height / 4);
        
        if(scrollPos >= minPos && scrollPos <= maxPos){
            var shift = (((scrollPos - minPos) / maxPos) * 100) + 0;
            parallax.css("background-position", "0% " + shift + "%");
        }
    }
    
}
