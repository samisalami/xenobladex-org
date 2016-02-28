angular.module('app')
    .directive('personMissingData',['PersonService', '$filter', function(PersonService, $filter) {
        return {
            restrict: 'E',
            templateUrl: 'js/data/person/directive/personMissingDataView.html',
            replace: true,
            link: function($scope, $element,$attrs) {
                init();

                function init() {
                    PersonService.onPersonsChanged(setPersons);
                    setPersons(PersonService.getPersons());
                }

                function setPersons(persons) {
                    $scope.missingDataArray = $filter('missingData')(persons);
                }
            }
        }
    }]);