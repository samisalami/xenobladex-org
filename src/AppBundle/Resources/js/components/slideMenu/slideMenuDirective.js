'use strict';

angular.module('app')
    .directive('slideMenu',['$rootScope', function($rootScope) {
        return {
            restrict: 'A',
            link: function ($scope, $elm, $attrs)
            {
                var active = false;
                var navActiveClass = 'slide-menu-open';
                var contentSelector = '.main-view';
                var newNav = $('<aside class="main-aside main-aside-mobile"></aside>'),
                    navButton = $($elm),
                    nav = $('#'+$attrs.menuId);

                var open = function() {
                    $('body').addClass(navActiveClass);
                    active = true;
                };

                var close = function() {
                    $('body').removeClass(navActiveClass);
                    active = false;
                };

                if(nav.length > 0) {
                    $('body').append(newNav.append(nav.html()));
                    $('.js_logo-wrapper').before(navButton);

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
                }

                $rootScope.$on('$locationChangeStart', function (event, next, current) {
                    close();
                    newNav.html(nav.html());
                });
            }
        };
    }]);