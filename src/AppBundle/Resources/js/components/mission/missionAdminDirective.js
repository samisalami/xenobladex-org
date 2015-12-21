'use strict';

angular.module('app')
    .directive('missionAdmin',['missionService', '$filter', function(missionService, $filter) {
        return {
            restrict: 'E',
            templateUrl:'templates/missionAdminView.html',
            replace: true,
            link: function($scope, $element,$attrs){
                var resetNewMission = function() {
                    $scope.newMission = {
                        name: '',
                        description: '',
                        location_note: '',
                        conditions: '',
                        tasks: '',
                        solution: '',
                        rewards: ''
                    };
                };

                resetNewMission();

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
                        $scope.missions.push(mission);
                        resetNewMission();
                        $('.modal').modal('hide');
                    });
                };

                $scope.deleteMission = function(mission) {
                  missionService.deleteMission(mission.id, function(deletedMission){
                    $scope.deletedMission = deletedMission;
                    var index = $scope.missions.indexOf(mission);
                    if(index !== -1) {
                        $scope.missions.splice(index,1);
                    }
                  });
                };

                $scope.addDeletedMission = function() {
                    $scope.addMission($scope.deletedMission);
                    $scope.deletedMission = null;
                };

                $scope.showSelectedMissionType = function(mission) {
                    if(typeof (mission) !== 'undefined' && typeof (mission.mission_type) !== 'undefined') {
                        var selected = $filter('filter')($scope.missionTypes, {id: mission.mission_type.id});
                        return (mission.mission_type && selected.length) ? selected[0].name : false;
                    } else {
                        return false;
                    }
                };
            }
        }
    }]);