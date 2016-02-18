angular.module('app')
    .directive('missionMissingData',['MissionService', '$filter', function(MissionService, $filter) {
        return {
            restrict: 'E',
            templateUrl: 'js/components/mission/missionMissingDataView.html',
            replace: true,
            link: function($scope, $element,$attrs) {
                var missions = [];
                MissionService.loadMissions(function (response) {
                    missions = response;
                    $scope.missingDataArray = $filter('missingData')(missions);
                });
            }
        }
    }]);