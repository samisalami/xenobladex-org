angular.module('app')
    .directive('equipUpgradeTierById',['$filter','EquipUpgradeTierService', function($filter, EquipUpgradeTierService) {
        return {
            restrict: 'A',
            link: function($scope, $element,$attrs){
                var equipUpgradeTierId = $attrs.equipUpgradeTierById;

                if(equipUpgradeTierId) {
                    EquipUpgradeTierService.onEquipUpgradeTiersChanged(setEquipUpgradeTierById);
                    setEquipUpgradeTierById(EquipUpgradeTierService.getEquipUpgradeTiers());
                }

                function setEquipUpgradeTierById(equipUpgradeTiers) {
                    $scope.equipUpgradeTierById = $filter('byId')(equipUpgradeTiers, equipUpgradeTierId) || null;
                }
            }
        }
    }]);