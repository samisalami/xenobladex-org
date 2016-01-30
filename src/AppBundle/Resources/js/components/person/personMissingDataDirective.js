angular.module('app')
    .directive('personMissingData',['personService', 'mapmarkerService', '$filter', function(personService, mapmarkerService, $filter) {
        return {
            restrict: 'E',
            templateUrl: 'js/components/person/personMissingDataView.html',
            replace: true,
            link: function($scope, $element,$attrs) {
                var persons = [];

                personService.getPersons(function(response){
                    persons = response;
                    $scope.missingDataArray = $filter('missingData')(persons);
                });
            }
        }
    }]);