'use strict';

angular.module('app')
    .directive('monsterAdmin',['MonsterService', function(MonsterService) {
        return {
            restrict: 'E',
            replace: true,
            controller: ['$scope',function($scope) {
                var that = this;
                init();

                function init() {
                    MonsterService.onMonstersChanged(setMonsters);
                    MonsterService.onMonsterDeleted(setDeletedMonster);
                    setMonsters(MonsterService.getMonsters());

                    that.newMonster = MonsterService.Monster;
                }

                function setMonsters(monsters) {
                    that.monsters = monsters;
                }

                function setDeletedMonster(monster) {
                    that.deletedMonster = monster;
                    delete that.deletedMonster.id;
                }

                that.addDeletedMonster = function() {
                    MonsterService.addMonster(that.deletedMonster);
                    delete that.deletedMonster;
                };
            }],
            controllerAs: 'vm'
        }
    }]);