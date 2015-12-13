'use strict';

angular.module('app')
    .directive('missionAdmin',['missionService', function(missionService) {
        return {
            restrict: 'E',
            templateUrl:'templates/missionAdminView.html',
            replace: true,
            link: function($scope, $element,$attrs){
                $scope.newMission = {
                    name: '',
                    description: '',
                    location_note: '',
                    conditions: '',
                    tasks: '',
                    solution: '',
                    rewards: ''
                };

                missionService.getMissionTypes(function(response){
                   $scope.missionTypes = response;
                });

                missionService.getMissions(function(response){
                    $scope.missions = response;
                });

                $scope.updateMission = function(mission) {
                    missionService.updateMission(mission);
                };

                $scope.addMission = function(mission) {
                    missionService.addMission(mission, function(mission){
                        $scope.missions = $scope.missions.concat(mission);
                        $scope.newMission = null;
                    });
                };

                $scope.deleteMission = function(id, index) {
                  missionService.deleteMission(id, function(mission){
                    $scope.missions.splice(index, 1);
                    $scope.deletedMission = mission;
                  });
                };

                $scope.addDeletedMission = function() {
                    $scope.addMission($scope.deletedMission);
                    $scope.deletedMission = null;
                };
            }
        }
    }]);