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
                    tasks: '',
                    solution: ''
                };

                missionService.getMissions(function(response){
                    $scope.missions = response;
                });

                $scope.updateMission = function(mission) {
                    missionService.updateMission(mission);
                };

                $scope.addMission = function(mission) {
                    missionService.addMission(mission, function(){
                        //clean add row
                    });
                };

                $scope.deleteMission = function(id) {
                  missionService.deleteMission(id);
                };
            }
        }
    }]);