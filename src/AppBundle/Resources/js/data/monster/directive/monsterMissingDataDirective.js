angular.module('app')
    .directive('monsterMissingData',['MonsterService', '$filter', function(MonsterService, $filter) {
        return {
            restrict: 'E',
            templateUrl: 'js/data/monster/view/monsterMissingDataView.html',
            replace: true,
            link: function($scope, $element,$attrs) {
                init();

                function init() {
                    MonsterService.onMonstersChanged(setMonsters);
                    setMonsters(MonsterService.getMonsters());
                }

                function setMonsters(monsters) {
                    $scope.monsters = monsters;
                }
            }
        }
    }]);