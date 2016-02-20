'use strict';

angular.module('app')
    .directive('missionForm',['MissionService', 'MissionTypeService', 'personService', 'RegionService', 'flashService', '$filter', function(MissionService, MissionTypeService, personService, RegionService, flashService, $filter) {
        return {
            restrict: 'E',
            replace: false,
            templateUrl: 'js/components/mission/missionFormView.html',
            scope: {
                missionSealed: "=mission"
            },
            controller: ['$scope',function($scope) {
                var that = this;
                init();

                function init() {
                    that.mission = $.extend({}, $scope.missionSealed, true);
                    that.missionTypes = MissionTypeService.MissionTypes;
                    that.regions = RegionService.Regions;

                    //personService.getPersons(function(response){
                    //    that.persons = response;
                    //});
                }

                that.deleteMission = function() {
                    MissionService.deleteMission(that.mission);
                };

                that.updateMission = function() {
                  MissionService.updateMission(that.mission);
                }
            }],
            controllerAs: 'form'
        }
    }]);