'use strict';

angular.module('app')
    .directive('paramFromUrl',['$routeParams', function($routeParams) {
        return {
            restrict: 'A',
            scope: true,
            link: function($scope, $element,$attrs){
                $scope.paramFromUrl = $routeParams[$attrs.paramName];
            }
        }
    }]);