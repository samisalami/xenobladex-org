'use strict';

angular.module('app')
    .directive('missionTable',['missionService', function(missionService) {
        return {
            restrict: 'E',
            templateUrl:'templates/missionTableView.html',
            replace: true,
            link: function($scope, $element,$attrs){
                missionService.getMissions(function(response){
                    $scope.missions = response;
                });
            }
        }
    }]);