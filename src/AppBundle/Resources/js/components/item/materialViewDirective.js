'use strict';

angular.module('app')
    .directive('materialView',['itemService','$filter', function(itemService, $filter) {
        return {
            restrict: 'EA',
            link: function($scope, $element,$attrs){
                itemService.getMaterialsDetail(function(response){
                    $scope.materials = response;
                });

                $scope.getValidCssClass = function(string) {
                    var regExp = new RegExp("[^A-Za-z0-9\-_]", "g");
                    return string.replace(regExp, '').toLowerCase();
                };
            }
        }
    }]);