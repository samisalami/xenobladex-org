'use strict';

angular.module('app')
    .directive('personAdmin',['personService', 'mapService', 'flashService', '$filter', function(personService, mapService, flashService, $filter) {
        return {
            templateUrl:'js/components/person/personAdminView.html',
            replace: true,
            link: function($scope, $element,$attrs){
                $scope.newPerson = {};

                mapService.getMaps(function(response){
                    $scope.maps = response;
                    initFormModel();
                });

                personService.getPersons(function(response){
                    $scope.persons = response;
                });

                var regions = [
                    {name:'NLA'},
                    {name:'Primordia'},
                    {name:'Noctilum'},
                    {name:'Oblivia'},
                    {name:'Sylvalum'},
                    {name:'Cauldros'}
                ];

                var speciesList = [
                    {name:'Mensch'},
                    {name:'Nopon'},
                    {name:'Ma-non'},
                    {name:'Zarubogganer'},
                    {name:'Orphen'},
                    {name:'Definianer'},
                    {name:'Baumklan-Prone'},
                    {name:'Höhlenklan-Prone'},
                    {name:'Qlu'},
                    {name:'Unbekannt'}
                ];

                var initFormModel = function() {
                    $scope.formModel = {
                        orderBy: ['species','name'],
                        fields: [
                            {
                                label: 'Alter',
                                name: 'age',
                                type: 'editableText'
                            },
                            {
                                label: 'Spezies',
                                name: 'species',
                                type: 'editableStringSelect',
                                data: speciesList
                            },
                            {
                                label: 'Beruf',
                                name: 'job',
                                type: 'editableText'
                            },
                            {
                                label: 'Beschreibung',
                                name: 'description',
                                type: 'editableTextarea'
                            },
                            {
                                label: 'Region',
                                name: 'region',
                                type: 'editableStringSelect',
                                data: regions
                            },
                            {
                                label: 'Zeit',
                                name: 'activity_time',
                                type: 'editableText'
                            },
                            {
                                label: 'Ortsbeschreibung',
                                name: 'location_note',
                                type: 'editableTextarea'
                            },
                            //{
                            //    label: 'Karte',
                            //    name: 'mapmarkers',
                            //    type: 'customMapmarkerInput',
                            //    data: $scope.maps
                            //},
                            {
                                label: 'Bedingungen',
                                name: 'conditions',
                                type: 'editableTextarea'
                            }
                        ]
                    };
                };

                $scope.updatePerson = function(person) {
                    personService.updatePerson(person);
                };

                $scope.addPerson = function(person) {
                    if(person) {
                        personService.addPerson(person, function(){
                            personService.getPersons(function(response){
                                $scope.persons = response;
                            });
                            $scope.newPerson = {};
                            flashService.clear();
                        });
                    } else {
                        flashService.error('Komplett leere Daten werden nicht angelegt.');
                    }
                };

                $scope.deletePerson = function(person, index) {
                    personService.deletePerson(person.id, function(deletedPerson){
                        $scope.deletedPerson = deletedPerson;
                        var index = $scope.persons.indexOf(person);
                        if(index !== -1) {
                            $scope.persons.splice(index,1);
                        }
                    });
                };

                $scope.addDeletedPerson = function() {
                    $scope.addPerson($scope.deletedPerson);
                    $scope.deletedPerson = null;
                };
            }
        }
    }]);