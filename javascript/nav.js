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
