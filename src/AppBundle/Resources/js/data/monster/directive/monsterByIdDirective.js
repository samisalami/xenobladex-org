angular.module('app')
    .directive('monsterById',['$filter','MonsterService', function($filter, MonsterService) {
        return {
            restrict: 'A',
            link: function($scope, $element,$attrs){
                var monsterId = $attrs.monsterById;

                if(monsterId) {
                    MonsterService.onMonstersChanged(setMonsterById);
                    setMonsterById(MonsterService.getMonsters());

                }

                function setMonsterById(monsters) {
                    $scope.monsterById = $filter('byId')(monsters, monsterId) || null;
                }
            }
        }
    }]);