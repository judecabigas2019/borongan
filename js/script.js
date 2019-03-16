$(function () {
	var basePath = ''
	// ------------------------------------------------------- //
    //   Multilevel dropdowns
    // ------------------------------------------------------ //

    $(".dropdown-menu [data-toggle='dropdown']").on("click", function (event) {
        event.preventDefault();
        event.stopPropagation();

        $(this).siblings().toggleClass("show");


        if (!$(this).next().hasClass('show')) {
            $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
        }
        $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function (e) {
            $('.dropdown-submenu .show').removeClass("show");
        });

    });

    // ------------------------------------------------------- //
    //   Home Full Slider
    // ------------------------------------------------------ //

    var homeFullSlider = $('.home-full-slider');
    homeFullSlider.owlCarousel({
        loop: true,
        margin: 0,
        smartSpeed: 500,
        responsiveClass: true,
        navText: ['<img src="' + basePath + 'images/prev.svg" alt="" width="50">', '<img src="' + basePath + 'images/next.svg" alt="" width="50">'],
        responsive: {
            0: {
                items: 1,
                nav: false,
                dots: true
            },
            600: {
                items: 1,
                nav: false,
                dots: true
            },
            1120: {
                items: 1,
                dots: false,
                nav: true
            }
        },
        onRefresh: function () {
            homeFullSlider.find('.item').height('');
        },
        onRefreshed: function () {
            var maxHeight = 0;
            var items = homeFullSlider.find('.item');
            items.each(function () {
                var itemHeight = $(this).height();
                if (itemHeight > maxHeight) {
                    maxHeight = itemHeight;
                }
            });
            items.height(maxHeight);
        }
    });

    // ------------------------------------------------------- //
    //   Product Slider
    // ------------------------------------------------------ //
    $('.event-slider').owlCarousel({
        loop: false,
        margin: 0,
        nav: false,
        dots: true,
        navText: ['<img src="' + basePath + 'images/prev.svg" alt="" width="50">', '<img src="' + basePath + 'images/next.svg" alt="" width="50">'],
        smartSpeed: 400,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 3
            }
        }
    });


     // ------------------------------------------------------- //
    //   Transparent navbar dropdowns 
    //
    //   = do not make navbar 
    //   transparent if dropdown's still open 
    //   / make transparent again when dropdown's closed
    // ------------------------------------------------------ //

    var navbar = $('.navbar'),
        navbarCollapse = $('.navbar-collapse');

    $('.navbar.bg-transparent .dropdown').on('show.bs.dropdown', function () {
        makeNavbarWhite();
    });

    $('.navbar.bg-transparent .dropdown').on('hide.bs.dropdown', function () {
        // if we're not on mobile, make navbar transparent 
        // after we close the dropdown

        if (!navbarCollapse.hasClass('show')) {
            makeNavbarTransparent();
        }
    });

    $('.navbar.bg-transparent .navbar-collapse').on('show.bs.collapse', function () {
        makeNavbarWhite();
    });


    $('.navbar.bg-transparent .navbar-collapse').on('hide.bs.collapse', function () {
        makeNavbarTransparent();
    });

    function makeNavbarWhite() {
        navbar.addClass('was-transparent');
        if (navbar.hasClass('navbar-dark')) {
            navbar.addClass('was-navbar-dark');
            navbar.removeClass('navbar-dark');
        } else {
            navbar.addClass('was-navbar-light');
        }

        navbar.removeClass('bg-transparent');

        navbar.addClass('bg-white');
        navbar.addClass('navbar-light');
    }

    function makeNavbarTransparent() {
        navbar.removeClass('bg-white');
        navbar.removeClass('navbar-light');
        navbar.removeClass('was-transparent');

        navbar.addClass('bg-transparent');
        if (navbar.hasClass('was-navbar-dark')) {
            navbar.addClass('navbar-dark');
        } else {
            navbar.addClass('navbar-light');
        }

    }

    // ------------------------------------------------------- //
    //   Open & Close Fullscreen Navbar Menu
    // ------------------------------------------------------ //

    $('.navbar-collapse-fullscreen').on('show.bs.collapse', function () {
        $(document.body).addClass('overflow-hidden')
    })
    $('.navbar-collapse-fullscreen').on('hide.bs.collapse', function () {
        $(document.body).removeClass('overflow-hidden')
    })

    // ------------------------------------------------------- //
    //   Make a sticky navbar on scrolling
    // ------------------------------------------------------ //
    $(window).scroll(function () {

        var body = $('body'),
            stickyNavbar = $('nav.navbar-sticky'),
            header = $('.header'),
            topbar = $('.top-bar');

        function makeItFixed(x) {
            if ($(window).scrollTop() > x) {
                stickyNavbar.addClass('fixed-top');
                if (!header.hasClass('header-absolute')) {
                    body.css('padding-top', stickyNavbar.outerHeight());
                    body.data('smooth-scroll-offset', stickyNavbar.outerHeight());
                }
            } else {
                stickyNavbar.removeClass('fixed-top');
                body.css('padding-top', '0');
            }
        }

        // if .top-bar exists, affix the navbar when we scroll past .top-bar
        // else affix it immediately
        if (stickyNavbar.length > 0 && topbar.length > 0) {
            makeItFixed(topbar.outerHeight());
        } else if (stickyNavbar.length > 0) {
            makeItFixed(0);
        }
    });
});