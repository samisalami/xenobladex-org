'use strict';

angular.module('app')
    .directive('slideMenu',['$rootScope', '$compile', function($rootScope, $compile) {
        return {
            restrict: 'A',
            link: function ($scope, $elm, $attrs)
            {
                var initialized = false;
                var active = false;
                var navActiveClass = 'slide-menu-open';
                var contentSelector = '.main-view';
                var newNav = $('<aside id="js_slide-menu" class="main-aside main-aside-mobile"></aside>'),
                    navButton = $($elm),
                    navWrapper = $('#'+$attrs.menuId),
                    nav = $('> nav', navWrapper);

                var init = function() {
                    if(navButton.is(':visible')) {
                        initNewNav();
                    } else {
                        close();
                        appendToOldNav()
                    }
                };

                var initNewNav = function() {
                    if($('#js_slide-menu').length===0) {
                        $('body').append(newNav);

                        $(contentSelector).on('click', function(e){
                            if(active===true) {
                                close();
                            }
                        });

                        $(navButton).on('click', function(e){
                            e.preventDefault();
                            if(active === true) {
                                close();
                            } else {
                                open();
                            }
                        });

                        $rootScope.$on('$locationChangeStart', function (event, next, current) {
                            init();
                        });
                    }
                };

                var appendToOldNav = function() {
                    if($('nav', navWrapper).length == 0) {
                        navWrapper.append(nav);
                    }
                };

                var open = function() {
                    newNav.html('');
                    newNav.append(nav);
                    $('body').addClass(navActiveClass);
                    active = true;
                };

                var close = function() {
                    $('body').removeClass(navActiveClass);
                    active = false;
                };

                if(nav.length==1) {
                    init();

                    $(window).on('resize', function(){
                        init();
                    });
                }
            }
        };
    }]);