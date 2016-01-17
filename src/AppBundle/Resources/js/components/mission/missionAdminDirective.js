'use strict';

angular.module('app')
    .directive('missionAdmin',['missionService', 'personService', 'flashService', '$filter', function(missionService, personService, flashService, $filter) {
        return {
            restrict: 'E',
            templateUrl:'templates/missionAdminView.html',
            replace: true,
            link: function($scope, $element,$attrs){
                $scope.newMission = {};
                var personDataLoaded = false;
                var missionTypesDataLoaded = false;

                var sidejobTypes = [
                    {name:'Suche'},
                    {name:'Jagd'},
                    {name:'Gespräch'}
                ];

                var regions = [
                    {name:'NLA'},
                    {name:'Primordia'},
                    {name:'Noctilum'},
                    {name:'Oblivia'},
                    {name:'Sylvalum'},
                    {name:'Cauldros'}
                ];

                $scope.dataLoaded = function(){
                    return personDataLoaded && missionTypesDataLoaded;
                };

                $scope.$watch($scope.dataLoaded, function(dataLoaded){
                   if(dataLoaded && !$scope.formModel) {
                       initFormModel();
                   }
                });

                var initFormModel = function() {
                    $scope.formModel = {
                        orderBy: 'name',
                        fields: [
                            {
                                label: 'Richtige Person?',
                                name: 'has_person',
                                type: 'inputCheckbox'
                            },
                            {
                                show: 'has_person',
                                showValue: true,
                                label: 'Auftraggeber',
                                name: 'person',
                                type: 'customMissionPersonSelect',
                                data: $scope.persons
                            },
                            {
                                hide: 'has_person',
                                hideValue: false,
                                label: 'Auftraggeber',
                                name: 'person_unrelated',
                                type: 'editableText'
                            },
                            {
                                label: 'BLADE-Level',
                                name: 'blade_level',
                                type: 'editableText',
                                fieldInfoTooltip: 'Nur Zahlen erlaubt.'
                            },
                            {
                                label: 'Kapitel',
                                name: 'chapter',
                                type: 'editableText',
                                fieldInfoTooltip: 'Nur Zahlen erlaubt.'
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
                                label: 'Nebenjob-Zielregion',
                                name: 'target_area',
                                type: 'editableStringSelect',
                                data: regions
                            },
                            {
                                label: 'Nebenjob-Typ',
                                name: 'sidejob_type',
                                type: 'editableStringSelect',
                                data: sidejobTypes
                            },
                            {
                                label: 'Nebenjob-Schwierigkeit',
                                name: 'difficulty',
                                type: 'editableText'
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
                                data: $scope.missionTypes
                            }
                        ]
                    };
                };

                missionService.getMissionTypes(function(response){
                    $scope.missionTypes = response;
                    missionTypesDataLoaded = true;
                });

                missionService.getMissions(function(response){
                    $scope.missions = response;
                });

                personService.getPersons(function(response){
                    $scope.persons = response;
                    personDataLoaded = true;
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
            }
        }
    }]);