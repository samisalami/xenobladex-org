angular.module('app')
    .directive('equipUpgradeMissingData',['EquipUpgradeService', 'EquipUpgradeTierService', '$filter', function(EquipUpgradeService, EquipUpgradeTierService, $filter) {
        return {
            restrict: 'E',
            templateUrl: 'js/data/equip/view/equipUpgradeMissingDataView.html',
            replace: true,
            link: function($scope, $element,$attrs) {
                init();

                function init() {
                    EquipUpgradeService.onEquipUpgradesChanged(setEquipUpgrades);
                    setEquipUpgrades(EquipUpgradeService.getEquipUpgrades());

                    EquipUpgradeTierService.onEquipUpgradeTiersChanged(setEquipUpgradeTiers);
                    setEquipUpgradeTiers(EquipUpgradeTierService.getEquipUpgradeTiers());
                }

                function setEquipUpgradeTiers(equipUpgradeTiers) {
                    $scope.equipUpgradeTiers = equipUpgradeTiers;
                }

                function setEquipUpgrades(equipUpgrades) {
                    $scope.equipUpgrades = equipUpgrades;
                }

                $scope.getEquipUpgradeTierMaterial = function(equipUpgrade, equipUpgradeTier, i) {
                    if(equipUpgradeTier.material_individual) {
                        return equipUpgradeTier['material'+i];
                    }

                    if (equipUpgradeTier.name == 'I' || equipUpgradeTier.name == 'V') {
                        return equipUpgrade['material_small'+i];
                    }

                    return equipUpgrade['material_large'+i];
                };
            }
        }
    }]);