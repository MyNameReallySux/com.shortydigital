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
