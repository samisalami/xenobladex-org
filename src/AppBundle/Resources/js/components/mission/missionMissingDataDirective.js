angular.module('app')
    .directive('missionMissingData',['missionService', '$filter', function(missionService, $filter) {
        return {
            restrict: 'E',
            templateUrl: 'js/components/mission/missionMissingDataView.html',
            replace: true,
            link: function($scope, $element,$attrs) {
                var missions = [];
                missionService.getMissions(function (response) {
                    missions = response;
                    $scope.missingDataArray = $filter('missingData')(missions);
                });
            }
        }
    }]);