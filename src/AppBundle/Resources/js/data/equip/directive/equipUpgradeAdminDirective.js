'use strict';

angular.module('app')
    .directive('equipUpgradeAdmin',['EquipUpgradeService', function(EquipUpgradeService) {
        return {
            restrict: "E",
            replace: true,
            controller: ['$scope',function($scope) {
                var that = this;
                init();

                function init() {
                    EquipUpgradeService.onEquipUpgradesChanged(setEquipUpgrades);
                    EquipUpgradeService.onEquipUpgradeDeleted(setDeletedEquipUpgrade);
                    setEquipUpgrades(EquipUpgradeService.getEquipUpgrades());

                    that.newEquipUpgrade = EquipUpgradeService.EquipUpgrade;
                }

                function setEquipUpgrades(equipUpgrades) {
                    that.equipUpgrades = equipUpgrades;
                }

                function setDeletedEquipUpgrade(equipUpgrade) {
                    that.deletedEquipUpgrade = equipUpgrade;
                    delete that.deletedEquipUpgrade.id;
                }

                that.addDeletedEquipUpgrade = function() {
                    EquipUpgradeService.addEquipUpgrade(that.deletedEquipUpgrade);
                    delete that.deletedEquipUpgrade;
                };
            }],
            controllerAs: 'vm'
        }
    }]);