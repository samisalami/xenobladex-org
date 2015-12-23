angular.module('app')
    .directive('missionMissingData',['missionService', function(missionService) {
        return {
            restrict: 'E',
            templateUrl: 'templates/missionMissingDataView.html',
            replace: true,
            link: function($scope, $element,$attrs) {
                missionService.getMissions(function (response) {
                    $scope.missions = response;
                });
            }
        }
    }]);