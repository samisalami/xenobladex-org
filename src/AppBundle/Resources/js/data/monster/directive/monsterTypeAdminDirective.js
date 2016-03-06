'use strict';

angular.module('app')
    .directive('monsterTypeAdmin',['MonsterTypeService', function(MonsterTypeService) {
        return {
            restrict: 'E',
            replace: true,
            controller: ['$scope',function($scope) {
                var that = this;
                init();

                function init() {
                    MonsterTypeService.onMonsterTypesChanged(setMonsterTypes);
                    MonsterTypeService.onMonsterTypeDeleted(setDeletedMonsterType);
                    setMonsterTypes(MonsterTypeService.getMonsterTypes());

                    that.newMonsterType = MonsterTypeService.MonsterType;
                }

                function setMonsterTypes(monsterTypes) {
                    that.monsterTypes = monsterTypes;
                }

                function setDeletedMonsterType(monsterType) {
                    that.deletedMonsterType = monsterType;
                    delete that.deletedMonsterType.id;
                }

                that.addDeletedMonsterType = function() {
                    MonsterTypeService.addMonsterType(that.deletedMonsterType);
                    delete that.deletedMonsterType;
                };
            }],
            controllerAs: 'vm'
        }
    }]);