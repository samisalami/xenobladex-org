'use strict';

angular.module('app')
    .directive('personAdmin',['personService', '$filter', function(personService, $filter) {
        return {
            templateUrl:'templates/personAdminView.html',
            replace: true,
            link: function($scope, $element,$attrs){
                var resetNewPerson = function() {
                    $scope.newPerson = {
                        name: '',
                        description: '',
                        division: '',
                        age: '',
                        location_note: '',
                        conditions: '',
                        activity_time: '',
                        species: ''
                    };
                };

                resetNewPerson();

                personService.getPersons(function(response){
                    $scope.persons = response;
                });

                $scope.updatePerson = function(person) {
                    personService.updatePerson(person);
                };

                $scope.addPerson = function(person) {
                    personService.addPerson(person, function(person){
                        $scope.persons = $scope.persons.concat(person);
                        resetNewPerson();
                        $('.modal').modal('hide');
                    });
                };

                $scope.deletePerson = function(id, index) {
                    personService.deletePerson(id, function(person){
                        $scope.persons.splice(index, 1);
                        $scope.deletedPerson = person;
                    });
                };

                $scope.addDeletedPerson = function() {
                    $scope.addPerson($scope.deletedPerson);
                    $scope.deletedPerson = null;
                };
            }
        }
    }]);