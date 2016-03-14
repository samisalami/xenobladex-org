'use strict';

angular.module('app')
    .directive('equipUpgradeCategoryAdmin',['EquipUpgradeCategoryService', function(EquipUpgradeCategoryService) {
        return {
            restrict: "E",
            replace: true,
            controller: ['$scope',function($scope) {
                var that = this;
                init();

                function init() {
                    EquipUpgradeCategoryService.onEquipUpgradeCategoriesChanged(setEquipUpgradeCategories);
                    EquipUpgradeCategoryService.onEquipUpgradeCategoryDeleted(setDeletedEquipUpgradeCategory);
                    setEquipUpgradeCategories(EquipUpgradeCategoryService.getEquipUpgradeCategories());

                    that.newEquipUpgradeCategory = EquipUpgradeCategoryService.EquipUpgradeCategory;
                }

                function setEquipUpgradeCategories(equipUpgradeCategories) {
                    that.equipUpgradeCategories = equipUpgradeCategories;
                }

                function setDeletedEquipUpgradeCategory(equipUpgradeCategory) {
                    that.deletedEquipUpgradeCategory = equipUpgradeCategory;
                    delete that.deletedEquipUpgradeCategory.id;
                }

                that.addDeletedEquipUpgradeCategory = function() {
                    EquipUpgradeCategoryService.addEquipUpgradeCategory(that.deletedEquipUpgradeCategory);
                    delete that.deletedEquipUpgradeCategory;
                };
            }],
            controllerAs: 'vm'
        }
    }]);