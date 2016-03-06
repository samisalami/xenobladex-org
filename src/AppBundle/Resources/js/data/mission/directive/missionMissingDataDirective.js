angular.module('app')
    .directive('missionMissingData',['MissionService', '$filter', function(MissionService, $filter) {
        return {
            restrict: 'E',
            templateUrl: 'js/data/mission/view/missionMissingDataView.html',
            replace: true,
            link: function($scope, $element,$attrs) {
                init();

                function init() {
                    MissionService.onMissionsChanged(setMissions);
                    setMissions(MissionService.getMissions());
                }

                function setMissions(missions) {
                    $scope.missingDataArray = $filter('missingData')(missions);
                }
            }
        }
    }]);