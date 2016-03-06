angular.module('app')
    .directive('monsterTypeById',['$filter','MonsterTypeService', function($filter, MonsterTypeService) {
        return {
            restrict: 'A',
            link: function($scope, $element,$attrs){
                var monsterTypeId = $attrs.monsterTypeById;

                if(monsterTypeId) {
                    MonsterTypeService.onMonsterTypesChanged(setMonsterTypeById);
                    setMonsterTypeById(MonsterTypeService.getMonsterTypes());

                }

                function setMonsterTypeById(monsterTypes) {
                    $scope.monsterTypeById = $filter('byId')(monsterTypes, monsterTypeId) || null;
                }
            }
        }
    }]);