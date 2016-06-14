'use strict';

angular.module('app')
    .directive('monsterMapmarker',['MonsterService','MonsterTypeService','$filter', function(MonsterService, MonsterTypeService, $filter) {
        return {
            restrict: 'E',
            scope: {
              monster: '@'
            },
            controller: ['$scope',function($scope) {
                var that = this;
                that.monsterId = $scope.monster;

                init();

                function init() {
                    MonsterService.onMonstersChanged(setMonster);
                    setMonster(MonsterService.getMonsters());
                }

                function setMonster(monsters) {
                    that.monster =  $filter('byId')(monsters, that.monsterId) || null;
                }
            }],
            controllerAs: 'vm'
        }
    }]);