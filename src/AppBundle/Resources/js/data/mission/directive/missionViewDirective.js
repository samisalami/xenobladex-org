'use strict';

angular.module('app')
    .directive('missionView',['MissionService', 'PersonService', '$filter', function(MissionService, PersonService, $filter) {
        return {
            restrict: 'E',
            controller: ['$scope',function($scope){
                var that = this;
                init();

                function init() {
                    MissionService.onMissionsChanged(setMissions);
                    setMissions(MissionService.getMissions());
                    PersonService.onPersonsChanged(setPersons);
                    setPersons(PersonService.getPersons());
                }

                function setMissions(missions) {
                    that.missions = missions;
                    setViewData();
                }

                function setPersons(persons) {
                    that.persons = persons;
                    setViewData();
                }

                function setViewData() {
                    if(that.missions && that.persons) {
                        var missions = that.missions;
                        missions.forEach(function(mission, index){
                            if($.isNumeric(mission.person)) {
                                mission.person = $filter('byId')(that.persons, mission.person) || null;
                            }
                        });
                        $scope.groupedMissions = $filter('groupByFilter')(missions,'mission_type',true);
                    }
                }
            }]
        }
    }]);