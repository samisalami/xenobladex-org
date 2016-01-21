angular.module('app')
    .directive('missionMissingData',['missionService', function(missionService) {
        return {
            restrict: 'E',
            templateUrl: 'js/components/mission/missionMissingDataView.html',
            replace: true,
            link: function($scope, $element,$attrs) {
                missionService.getMissions(function (response) {
                    $scope.missions = response;
                });
            }
        }
    }]);