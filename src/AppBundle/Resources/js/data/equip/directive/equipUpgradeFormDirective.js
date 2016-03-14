'use strict';

angular.module('app')
    .directive('equipUpgradeForm',['EquipUpgradeService', 'EquipUpgradeCategoryService', '$filter', function(EquipUpgradeService, EquipUpgradeCategoryService, $filter) {
        return {
            restrict: 'E',
            replace: false,
            templateUrl: 'js/data/equip/view/equipUpgradeFormView.html',
            scope: {
                equipUpgradeSealed: "=equipUpgrade",
                addForm: "@"
            },
            controller: ['$scope',function($scope) {
                var that = this;
                init();

                function init() {
                    setFormEquipUpgrade($scope.equipUpgradeSealed);
                    EquipUpgradeCategoryService.onEquipUpgradeCategoriesChanged(setEquipUpgradeCategoriesData);
                    setEquipUpgradeCategoriesData(EquipUpgradeCategoryService.getEquipUpgradeCategories());
                }

                function setEquipUpgradeCategoriesData(equipUpgradeCategories) {
                    that.equipUpgradeCategories = equipUpgradeCategories;
                    that.equipUpgradeCategory = that.equipUpgrade.category ? $.extend({},$filter('byId')(equipUpgradeCategories, that.equipUpgrade.category),true) : {};
                }

                function setFormEquipUpgrade(equipUpgrade) {
                    that.equipUpgrade = $.extend({}, equipUpgrade, true);
                }

                function setEquipUpgradeCategory(callback) {
                    if(that.equipUpgradeCategory.id || that.equipUpgradeCategory.name) {
                        if(that.equipUpgradeCategory.id) {
                            that.equipUpgrade.category = that.equipUpgradeCategory.id;
                            callback();
                        } else {
                            EquipUpgradeCategoryService.addEquipUpgradeCategory(that.equipUpgradeCategory).then(function(response) {
                                that.equipUpgrade.category = response.data.id;
                                callback();
                            });
                        }
                    } else {
                        callback();
                    }
                }

                that.deleteEquipUpgrade = function() {
                    EquipUpgradeService.deleteEquipUpgrade(that.equipUpgrade);
                };

                that.updateEquipUpgrade = function() {
                    if(!that.isUpdating) {
                        that.isUpdating = true;
                        setEquipUpgradeCategory(function() {
                            if(that.equipUpgrade.id) {
                                EquipUpgradeService.updateEquipUpgrade(that.equipUpgrade);
                                setEquipUpgradeCategoriesData(that.equipUpgradeCategories);
                                that.isUpdating = false;
                            } else {
                                EquipUpgradeService.addEquipUpgrade(that.equipUpgrade);
                                setFormEquipUpgrade($scope.equipUpgradeSealed);
                                setEquipUpgradeCategoriesData(that.equipUpgradeCategories);
                                that.isUpdating = false;
                            }
                        });
                    }
                }
            }],
            controllerAs: 'form'
        }
    }]);