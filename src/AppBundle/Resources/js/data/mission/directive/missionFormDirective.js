'use strict';

angular.module('app')
    .directive('missionForm',['MissionService', 'MissionTypeService', 'PersonService', 'RegionService', 'SideJobTypeService', 'flashService', '$filter', function(MissionService, MissionTypeService, PersonService, RegionService, SideJobTypeService, flashService, $filter) {
        return {
            restrict: 'E',
            replace: false,
            templateUrl: 'js/data/mission/view/missionFormView.html',
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

                    PersonService.onPersonsChanged(setPersons);
                    setPersons(PersonService.getPersons());

                    setRegions(RegionService.Regions);
                    setSideJobTypes(SideJobTypeService.SideJobTypes);
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

                function setPersons(persons) {
                    that.persons = persons;
                }

                function setFormMission(mission) {
                    that.mission = $.extend({}, mission, true);
                }

                function submitChangeToService() {
                    if(that.mission.id) {
                        MissionService.updateMission(that.mission);
                    } else {
                        MissionService.addMission(that.mission);
                        setFormMission($scope.missionSealed);
                    }
                }

                that.deleteMission = function() {
                    MissionService.deleteMission(that.mission);
                };

                that.updateMission = function() {
                    if(that.mission.person.id) {
                        PersonService.addPerson(mission.person).then(function() {
                            submitChangeToService();
                        })
                    } else {
                        submitChangeToService();
                    }
                }
            }],
            controllerAs: 'form'
        }
    }]);