'use strict';

angular.module('app')
    .directive('slideMenu',['$rootScope', '$compile', function($rootScope, $compile) {
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
                    newNav.html($compile(nav.html())($scope));
                    $('body').addClass(navActiveClass);
                    active = true;
                };

                var close = function() {
                    $('body').removeClass(navActiveClass);
                    active = false;
                };

                if(nav.length > 0) {
                    $('body').append(newNav.append($compile(nav.html())($scope)));

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