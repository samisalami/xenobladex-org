'use strict';

angular.module('app')
    .directive('highlightedNavItem',['$location', '$rootScope', function($location, $rootScope) {
        return {
            restrict: 'A',
            link: function($scope, $element,$attrs){
                var cssClass = $attrs.navItemClass;
                var route = $attrs.navItemRoute;
                var equals = $attrs.navItemRouteEquals;

                var highlightNavItems = function() {
                    if(equals) {
                        if($location.path()===route) {
                            $($element).addClass(cssClass);
                        } else {
                            $($element).removeClass(cssClass);
                        }
                    } else {
                        if ($location.path().substr(0, route.length) === route) {
                            $($element).addClass(cssClass);
                        } else {
                            $($element).removeClass(cssClass);
                        }
                    }
                };

                highlightNavItems();

                $rootScope.$on('$locationChangeStart', function (event, next, current) {
                    highlightNavItems();
                });
            }
        }
    }]);