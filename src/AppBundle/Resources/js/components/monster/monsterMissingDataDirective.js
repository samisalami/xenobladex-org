angular.module('app')
    .directive('monsterMissingData',['monsterService', '$filter', function(monsterService, $filter) {
        return {
            restrict: 'E',
            templateUrl: 'js/components/monster/monsterMissingDataView.html',
            replace: true,
            link: function($scope, $element,$attrs) {
                var monsters = [];

                monsterService.getMonstersDetail(function(response){
                    monsters = response;
                    $scope.missingDataArray = $filter('missingData')(monsters);
                });
            }
        }
    }]);