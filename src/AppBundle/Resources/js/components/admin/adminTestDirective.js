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
                            label: 'Richtige Person?',
                            name: 'has_person',
                            type: 'inputCheckbox'
                        },
                        {
                            show: 'has_person',
                            label: 'Auftraggeber',
                            name: 'person',
                            type: 'customMissionPersonSelect',
                            data: persons
                        },
                        {
                            hide: 'has_person',
                            label: 'Auftraggeber',
                            name: 'person_unrelated',
                            type: 'editableText',
                            noColumn: true
                        },
                        {
                            label: 'Bedingungen',
                            name: 'conditions',
                            type: 'editableTextarea'
                        },
                        {
                            label: 'Erhalt wo?',
                            name: 'location_note',
                            type: 'editableTextarea'
                        },
                        {
                            label: 'Beschreibung',
                            name: 'description',
                            type: 'editableTextarea'
                        },
                        {
                            label: 'Aufgaben',
                            name: 'tasks',
                            type: 'editableTextarea'
                        },
                        {
                            label: 'Lösung',
                            name: 'solution',
                            type: 'editableTextarea'
                        },
                        {
                            label: 'Belohnung',
                            name: 'rewards',
                            type: 'editableTextarea'
                        },
                        {
                            label: 'Typ',
                            name: 'mission_type',
                            type: 'editableObjectSelect',
                            data: missionTypes
                        }
                    ];
                };

                $scope.updateMission = function(mission) {
                    console.log(mission);
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