'use strict';

angular.module('app')
    .directive('materialView',['monsterService','$filter', function(monsterService, $filter) {
        return {
            restrict: 'E',
            link: function($scope, $element,$attrs){
                monsterService.getMonsterTypes(function(response){
                    $scope.monsterTypes = response;
                });
            }
        }
    }]);