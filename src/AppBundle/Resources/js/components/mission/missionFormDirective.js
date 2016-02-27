'use strict';

angular.module('app')
    .directive('missionForm',['MissionService', 'MissionTypeService', 'personService', 'RegionService', 'flashService', '$filter', function(MissionService, MissionTypeService, personService, RegionService, flashService, $filter) {
        return {
            restrict: 'E',
            replace: false,
            templateUrl: 'js/components/mission/missionFormView.html',
            scope: {
                missionSealed: "=mission",
                addForm: "@"
            },
            controller: ['$scope',function($scope) {
                var that = this;
                init();

                function init() {
                    getFormMission();
                    that.missionTypes = MissionTypeService.MissionTypes;
                    that.regions = RegionService.Regions;


                    //personService.getPersons(function(response){
                    //    that.persons = response;
                    //});
                }

                function getFormMission() {
                    that.mission = $.extend({}, $scope.missionSealed, true);
                }

                that.deleteMission = function() {
                    MissionService.deleteMission(that.mission);
                };

                that.updateMission = function() {
                    if(that.mission.id) {
                        MissionService.updateMission(that.mission);
                    } else {
                        MissionService.addMission(that.mission);
                        getFormMission();
                    }
                }
            }],
            controllerAs: 'form'
        }
    }]);