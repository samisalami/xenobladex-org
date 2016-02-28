'use strict';

angular.module('app')
    .directive('monsterMaterialByMonsterType',['$filter', function($filter) {
        return {
            link: function($scope, $element,$attrs){
                $scope.materialByMonsterType = function() {
                    var materials = $filter('byId')($scope.formSelectOptions, $scope.formFieldBind.monster_type.id).materials;
                    $scope.formFieldBind.materials = materials;
                }
            }
        }
    }]);