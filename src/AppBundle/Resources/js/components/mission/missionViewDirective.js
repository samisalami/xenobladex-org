'use strict';

angular.module('app')
    .directive('missionView',['MissionService','$filter', function(MissionService, $filter) {
        return {
            restrict: 'E',
            link: function($scope, $element,$attrs){
                MissionService.loadMissions(function(response){
                    $scope.groupedMissions = $filter('groupByFilter')(response,'mission_type',true);
                });
            }
        }
    }]);