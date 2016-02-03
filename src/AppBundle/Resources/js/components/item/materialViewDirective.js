'use strict';

angular.module('app')
    .directive('materialView',['itemService','$filter', function(itemService, $filter) {
        return {
            restrict: 'E',
            link: function($scope, $element,$attrs){
                itemService.getMaterialsDetail(function(response){
                    $scope.materials = response;
                });
            }
        }
    }]);