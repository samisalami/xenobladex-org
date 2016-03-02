angular.module('app')
    .directive('monsterMissingData',['monsterService', '$filter', function(monsterService, $filter) {
        return {
            restrict: 'E',
            templateUrl: 'js/data/monster/monsterMissingDataView.html',
            replace: true,
            link: function($scope, $element,$attrs) {
                monsterService.getMonsters(function(response){
                    $scope.monsters = response;
                }, 'monsterDetail');
            }
        }
    }]);