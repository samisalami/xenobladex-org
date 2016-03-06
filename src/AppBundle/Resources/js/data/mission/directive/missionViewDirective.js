'use strict';

angular.module('app')
    .directive('missionView',['MissionService','$filter', function(MissionService, $filter) {
        return {
            restrict: 'E',
            link: function($scope, $element,$attrs){
                init();

                function init() {
                    MissionService.onMissionsChanged(setMissions);
                    setMissions(MissionService.getMissions());
                }

                function setMissions(missions) {
                    $scope.groupedMissions = $filter('groupByFilter')(missions,'mission_type',true);
                }
            }
        }
    }]);