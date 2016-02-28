'use strict';

angular.module('app')
    .directive('personAdmin',['PersonService', 'mapService', 'flashService', '$filter', function(PersonService, mapService, flashService, $filter) {
        return {
            restrict: 'E',
            replace: true,
            controller: ['$scope',function($scope) {
                var that = this;
                init();

                function init() {
                    PersonService.onPersonsChanged(setPersons);
                    PersonService.onPersonDeleted(setDeletedPerson);
                    setPersons(PersonService.getPersons());

                    that.newPerson = PersonService.Person;
                }

                function setPersons(persons) {
                    that.persons = persons;
                }

                function setDeletedPerson(person) {
                    that.deletedPerson = person;
                    delete that.deletedPerson.id;
                }

                that.addDeletedPerson = function() {
                    PersonService.addPerson(that.deletedPerson);
                    delete that.deletedPerson;
                };
            }],
            controllerAs: 'vm'
        }
    }]);