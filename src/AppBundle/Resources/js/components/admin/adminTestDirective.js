'use strict';

angular.module('app')
    .directive('adminTest',['missionService', 'personService',function(missionService, personService) {
        return {
            restrict: 'E',
            templateUrl: 'templates/adminTestView.html',
            replace: true,
            scope: {
            },
            link: function($scope, element, attrs) {
                var missionTypes;
                var persons;

                missionService.getMissions(function(response){
                    $scope.missions = response;
                });

                missionService.getMissionTypes(function(response){
                    missionTypes = response;
                    personService.getPersons(function(response){
                        persons = response;
                        initFormModel();
                    });
                });

                var initFormModel = function() {
                    $scope.formModel = [
                        {
                            label: 'Beschreibung',
                            name: 'description',
                            type: 'fieldsetTextarea'
                        },
                        {
                            label: 'Bedingungen',
                            name: 'conditions',
                            type: 'editableTextarea'
                        },
                        {
                            label: 'Ortsbeschreibung',
                            name: 'location_note',
                            type: 'editableTextarea'
                        },
                        {
                            label: 'Typ',
                            name: 'mission_type',
                            type: 'editableObjectSelect',
                            data: missionTypes
                        },
                        {
                            label: 'Auftraggeber',
                            name: 'person',
                            type: 'customMissionPersonSelect',
                            data: persons
                        },
                        {
                            label: 'Belohnung',
                            name: 'rewards',
                            type: 'editableTextarea'
                        },
                        {
                            label: 'Lösung',
                            name: 'solution',
                            type: 'editableTextarea'
                        },
                        {
                            label: 'Aufgaben',
                            name: 'tasks',
                            type: 'editableTextarea'
                        }
                    ];
                };

                $scope.updateMission = function(mission) {
                    console.log('update mission');
                };

                $scope.deleteMission = function(mission) {
                    console.log($scope.missions);
                };

                $scope.addMission = function(mission) {
                    console.log(mission);
                };
            }
        }
    }]);