'use strict';

angular.module('app')
    .directive('missionView',['missionService','$filter', function(missionService, $filter) {
        return {
            restrict: 'E',
            link: function($scope, $element,$attrs){
                missionService.getMissions(function(response){
                    $scope.groupedMissions = $filter('groupByFilter')(response,'mission_type',true);
                });
            }
        }
    }]);