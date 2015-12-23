angular.module('app')
    .directive('personMissingData',['personService', function(personService) {
        return {
            restrict: 'E',
            templateUrl: 'templates/personMissingDataView.html',
            replace: true,
            link: function($scope, $element,$attrs) {
                personService.getPersons(function (response) {
                    $scope.persons = response;
                });
            }
        }
    }]);