'use strict';

angular.module('app')
    .directive('missionAdmin',['missionService', 'personService', 'flashService', '$filter', function(missionService, personService, flashService, $filter) {
        return {
            restrict: 'E',
            templateUrl:'templates/missionAdminView.html',
            replace: true,
            link: function($scope, $element,$attrs){
                $scope.newMission = {};

                missionService.getMissionTypes(function(response){
                   $scope.missionTypes = response;
                });

                missionService.getMissions(function(response){
                    $scope.missions = response;
                });

                $scope.personDataLoaded = false;
                personService.getPersons(function(response){
                    $scope.persons = response;
                    $scope.personDataLoaded = true;
                });

                $scope.updateMission = function(mission) {
                    missionService.updateMission(mission);
                    if(mission.person) {
                        personService.getPersons(function(response) {
                            $scope.persons = response;
                        });
                    }
                };

                $scope.addMission = function(mission) {
                    if(mission) {
                        missionService.addMission(mission, function(){
                            missionService.getMissions(function(response){
                                $scope.missions = response;
                            });
                            $scope.newMission = {};
                            flashService.clear();
                        });
                    } else {
                        flashService.error('Komplett leere Daten werden nicht angelegt.');
                    }
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
                    if(mission && typeof (mission) !== 'undefined' && typeof (mission.mission_type) !== 'undefined') {
                        var selected = $filter('filter')($scope.missionTypes, {id: mission.mission_type.id});
                        return (mission.mission_type && selected.length) ? selected[0].name : false;
                    } else {
                        return false;
                    }
                };
            }
        }
    }]);