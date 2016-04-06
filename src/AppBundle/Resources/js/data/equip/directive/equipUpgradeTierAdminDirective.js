'use strict';

angular.module('app')
    .directive('equipUpgradeTierAdmin',['EquipUpgradeTierService', function(EquipUpgradeTierService) {
        return {
            restrict: "E",
            replace: true,
            controller: ['$scope',function($scope) {
                var that = this;
                init();

                function init() {
                    EquipUpgradeTierService.onEquipUpgradeTiersChanged(setEquipUpgradeTiers);
                    EquipUpgradeTierService.onEquipUpgradeTierDeleted(setDeletedEquipUpgradeTier);
                    setEquipUpgradeTiers(EquipUpgradeTierService.getEquipUpgradeTiers());

                    that.newEquipUpgradeTier = EquipUpgradeTierService.EquipUpgradeTier;
                }

                function setEquipUpgradeTiers(equipUpgradeTiers) {
                    that.equipUpgradeTiers = equipUpgradeTiers;
                }

                function setDeletedEquipUpgradeTier(equipUpgradeTier) {
                    that.deletedEquipUpgradeTier = equipUpgradeTier;
                    delete that.deletedEquipUpgradeTier.id;
                }

                that.addDeletedEquipUpgradeTier = function() {
                    EquipUpgradeTierService.addEquipUpgradeTier(that.deletedEquipUpgradeTier);
                    delete that.deletedEquipUpgradeTier;
                };
            }],
            controllerAs: 'vm'
        }
    }]);