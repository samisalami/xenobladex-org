angular.module('app')
    .directive('personById',['$filter','PersonService', function($filter, PersonService) {
        return {
            restrict: 'A',
            link: function($scope, $element,$attrs){
                var personId = $attrs.personById;

                if(personId) {
                    PersonService.onPersonsChanged(setPersonById);
                    setPersonById(PersonService.getPersons());

                }

                function setPersonById(persons) {
                    $scope.personById = $filter('byId')(persons, personId) || null;
                }
            }
        }
    }]);