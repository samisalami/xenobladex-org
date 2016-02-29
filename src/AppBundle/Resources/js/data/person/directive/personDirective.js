angular.module('app')
    .directive('person',['$filter','PersonService', function(PersonService, $filter) {
        return {
            restrict: 'A',
            link: function($scope, $element,$attrs){
                var personId = $attrs.person;
                var persons = PersonService.getPersons();
                var person = $filter('byId')(persons, personId);
            }
        }
    }]);