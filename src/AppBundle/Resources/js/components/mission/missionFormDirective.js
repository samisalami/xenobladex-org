'use strict';

angular.module('app')
    .directive('missionForm',['MissionService', 'MissionTypeService', 'personService', 'RegionService', 'SideJobTypeService', 'flashService', '$filter', function(MissionService, MissionTypeService, personService, RegionService, SideJobTypeService, flashService, $filter) {
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
                    setFormMission($scope.missionSealed);

                    MissionTypeService.onMissionTypesChanged(setMissionTypes);
                    setMissionTypes(MissionTypeService.getMissionTypes());

                    setRegions(RegionService.Regions);
                    setSideJobTypes(SideJobTypeService.SideJobTypes);


                    //personService.getPersons(function(response){
                    //    that.persons = response;
                    //});
                }

                function setRegions(regions) {
                    that.regions = regions;
                }

                function setSideJobTypes(sideJobTypes) {
                    that.sideJobTypes = sideJobTypes;
                }

                function setMissionTypes(missionTypes) {
                    that.missionTypes = missionTypes;
                }

                function setFormMission(mission) {
                    that.mission = $.extend({}, mission, true);
                }

                that.deleteMission = function() {
                    MissionService.deleteMission(that.mission);
                };

                that.updateMission = function() {
                    if(that.mission.id) {
                        MissionService.updateMission(that.mission);
                    } else {
                        MissionService.addMission(that.mission);
                        setFormMission($scope.missionSealed);
                    }
                }
            }],
            controllerAs: 'form'
        }
    }]);