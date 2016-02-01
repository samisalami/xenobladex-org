'use strict';

angular.module('app')
    .directive('missionAdmin',['missionService', 'personService', 'mapService', 'flashService', '$filter', function(missionService, personService, mapService, flashService, $filter) {
        return {
            restrict: 'E',
            templateUrl:'js/components/mission/missionAdminView.html',
            replace: true,
            link: function($scope, $element,$attrs){
                $scope.newMission = {};
                var personDataLoaded = false;
                var missionTypesDataLoaded = false;
                var mapDataLoaded = false;

                var sidejobTypes = [
                    {name:'Suche'},
                    {name:'Jagd'},
                    {name:'Gespräch'}
                ];

                var regions = [
                    {name:'BLADE-Quartier'},
                    {name:'Industriegebiet'},
                    {name:'Verwaltungsbezirk'},
                    {name:'Wohnviertel'},
                    {name:'Geschäftsviertel'},
                    {name:'Ma-non-Schiff'},
                    {name:'Primordia'},
                    {name:'Noctilum'},
                    {name:'Oblivia'},
                    {name:'Sylvalum'},
                    {name:'Cauldros'}
                ];

                $scope.dataLoaded = function(){
                    return personDataLoaded && missionTypesDataLoaded && mapDataLoaded;
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
                                type: 'customAutoCompleteSelect',
                                data: $scope.persons
                            },
                            {
                                hide: 'has_person',
                                hideValue: false,
                                label: 'Auftraggeber',
                                name: 'person_unrelated',
                                type: 'inputText'
                            },
                            {
                                label: 'Bedingung - BLADE-Level',
                                name: 'blade_level',
                                type: 'inputText',
                                fieldInfoTooltip: 'Nur Zahlen erlaubt.'
                            },
                            {
                                label: 'Bedingung - Kapitel',
                                name: 'chapter',
                                type: 'inputText',
                                fieldInfoTooltip: 'Nur Zahlen erlaubt.'
                            },
                            {
                                label: 'Bedingungen',
                                name: 'conditions',
                                type: 'textarea'
                            },
                            {
                                label: 'Erhalt wo?',
                                name: 'location_note',
                                type: 'textarea'
                            },
                            {
                                label: 'Nebenjob-Zielregion',
                                name: 'target_area',
                                type: 'stringSelect',
                                data: regions
                            },
                            {
                                label: 'Nebenjob-Typ',
                                name: 'sidejob_type',
                                type: 'stringSelect',
                                data: sidejobTypes
                            },
                            {
                                label: 'Nebenjob-Schwierigkeit',
                                name: 'difficulty',
                                type: 'inputText',
                                fieldInfoTooltip: 'Nur Zahlen erlaubt (kleine Sterne addieren).'
                            },
                            {
                                label: 'Beschreibung',
                                name: 'description',
                                type: 'textarea'
                            },
                            {
                                label: 'Aufgaben',
                                name: 'tasks',
                                type: 'textarea'
                            },
                            {
                                label: 'Lösung',
                                name: 'solution',
                                type: 'textarea'
                            },
                            {
                                label: 'Belohnung',
                                name: 'rewards',
                                type: 'textarea'
                            },
                            {
                                label: 'Typ',
                                name: 'mission_type',
                                type: 'objectSelect',
                                data: $scope.missionTypes
                            },
                            {
                                label: 'Karte',
                                name: 'mapmarkers',
                                type: 'customMapmarkerInput',
                                data: $scope.maps
                            }
                        ]
                    };
                };

                missionService.getMissions(function(response){
                    $scope.missions = response;
                });

                missionService.getMissionTypes(function(response){
                    $scope.missionTypes = response;
                    missionTypesDataLoaded = true;
                });

                personService.getPersons(function(response){
                    $scope.persons = response;
                    personDataLoaded = true;
                });

                mapService.getMaps(function(response){
                    $scope.maps = response;
                    mapDataLoaded = true;
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