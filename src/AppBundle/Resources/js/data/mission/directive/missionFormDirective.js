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

                    PersonService.onPersonsChanged(setPersonData);
                    setPersonData(PersonService.getPersons());

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

                function setPersonData(persons) {
                    that.persons = persons;
                    that.person = that.mission.person ? $.extend({},$filter('byId')(persons, that.mission.person),true) : {};
                }

                function setFormMission(mission) {
                    that.mission = $.extend({}, mission, true);
                }

                function setPerson(callback) {
                    if(that.person.id) {
                        that.mission.person = that.person.id;
                        callback();
                    } else {
                        PersonService.addPerson(that.person).then(function(response) {
                            console.log(response);
                            that.mission.person = response.data.id;
                            callback();
                        });
                    }
                }

                that.deleteMission = function() {
                    MissionService.deleteMission(that.mission);
                };

                that.updateMission = function() {
                    setPerson(function() {
                        if(that.mission.id) {
                            MissionService.updateMission(that.mission);
                        } else {
                            MissionService.addMission(that.mission);
                            setFormMission($scope.missionSealed);
                        }
                    });
                }
            }],
            controllerAs: 'form'
        }
    }]);