angular.module('app')
    .directive('equipUpgradeById',['$filter','EquipUpgradeService', function($filter, EquipUpgradeService) {
        return {
            restrict: 'A',
            link: function($scope, $element,$attrs){
                var equipUpgradeId = $attrs.equipUpgradeById;

                if(equipUpgradeId) {
                    EquipUpgradeService.onEquipUpgradesChanged(setEquipUpgradeById);
                    setEquipUpgradeById(EquipUpgradeService.getEquipUpgrades());
                }

                function setEquipUpgradeById(equipUpgrades) {
                    $scope.equipUpgradeById = $filter('byId')(equipUpgrades, equipUpgradeId) || null;
                }
            }
        }
    }]);