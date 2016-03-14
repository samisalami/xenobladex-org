'use strict';

angular.module('app')
    .directive('equipUpgradeCategoryForm',['EquipUpgradeCategoryService', 'EquipUpgradeTypeService', function(EquipUpgradeCategoryService, EquipUpgradeTypeService) {
        return {
            restrict: 'E',
            replace: false,
            templateUrl: 'js/data/equip/view/equipUpgradeCategoryFormView.html',
            scope: {
                equipUpgradeCategorySealed: "=equipUpgradeCategory",
                addForm: "@"
            },
            controller: ['$scope',function($scope) {
                var that = this;
                init();

                function init() {
                    setFormEquipUpgradeCategory($scope.equipUpgradeCategorySealed);
                    setEquipUpgradeTypes(EquipUpgradeTypeService.EquipUpgradeTypes);
                }

                function setEquipUpgradeTypes(equipUpgradeTypes) {
                    that.equipUpgradeTypes = equipUpgradeTypes;
                }

                function setFormEquipUpgradeCategory(equipUpgradeCategory) {
                    that.equipUpgradeCategory = $.extend({}, equipUpgradeCategory, true);
                }

                that.deleteEquipUpgradeCategory = function() {
                    EquipUpgradeCategoryService.deleteEquipUpgradeCategory(that.equipUpgradeCategory);
                };

                that.updateEquipUpgradeCategory = function() {
                    if(that.equipUpgradeCategory.id) {
                        EquipUpgradeCategoryService.updateEquipUpgradeCategory(that.equipUpgradeCategory);
                    } else {
                        EquipUpgradeCategoryService.addEquipUpgradeCategory(that.equipUpgradeCategory);
                        setFormEquipUpgradeCategory($scope.equipUpgradeCategorySealed);
                    }
                }
            }],
            controllerAs: 'form'
        }
    }]);