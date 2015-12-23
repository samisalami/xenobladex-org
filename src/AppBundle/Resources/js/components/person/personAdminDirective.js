'use strict';

angular.module('app')
    .directive('personAdmin',['personService', 'flashService', '$filter', function(personService, flashService, $filter) {
        return {
            templateUrl:'templates/personAdminView.html',
            replace: true,
            link: function($scope, $element,$attrs){
                $scope.newPerson = {};

                personService.getPersons(function(response){
                    $scope.persons = response;
                });

                $scope.regions = [
                    {name:'NLA'},
                    {name:'Primordia'},
                    {name:'Noctilum'},
                    {name:'Oblivia'},
                    {name:'Sylvalum'},
                    {name:'Cauldros'}
                ];

                $scope.speciesList = [
                    {name:'Mensch'},
                    {name:'Nopon'},
                    {name:'Ma-non'}
                ];

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