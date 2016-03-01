angular.module('app')
    .directive('personById',['$filter','PersonService', function(PersonService, $filter) {
        return {
            restrict: 'A',
            link: function($scope, $element,$attrs){
                var personId = $attrs.person;

                PersonService.onPersonsChanged(setPersonById);
                setPersonById(PersonService.getPersons());

                var setPersonById = function(persons) {
                    $scope.personById = $filter('byId')(persons, personId);
                };
            }
        }
    }]);