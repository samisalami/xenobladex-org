'use strict';

angular.module('app')
    .directive('highlightedNavItem',['$location', '$rootScope', function($location, $rootScope) {
        return {
            restrict: 'A',
            link: function($scope, $element,$attrs){
                var cssClass = $attrs.navItemClass;
                var route = $attrs.navItemRoute;

                var highlightNavItems = function() {
                    console.log('highlight');
                    console.log($location.path());
                    console.log(route);
                    if($attrs.navItemRouteEquals) {
                        if($location.path()===route) {
                            console.log('active route:' + route);
                            $($element).addClass(cssClass);
                        } else {
                            $($element).removeClass(cssClass);
                        }
                    } else {
                        if ($location.path().substr(0, route.length) === route) {
                            console.log('active route:' + route);
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