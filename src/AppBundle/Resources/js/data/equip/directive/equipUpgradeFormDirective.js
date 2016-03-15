'use strict';

angular.module('app')
    .directive('equipUpgradeForm',['EquipUpgradeService', 'EquipUpgradeCategoryService', 'EquipUpgradeTierService', '$filter', function(EquipUpgradeService, EquipUpgradeCategoryService, EquipUpgradeTierService, $filter) {
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

                    EquipUpgradeTierService.onEquipUpgradeTiersChanged(setEquipUpgradeTiers);
                    setEquipUpgradeTiers(EquipUpgradeTierService.getEquipUpgradeTiers());
                }

                function setEquipUpgradeCategoriesData(equipUpgradeCategories) {
                    that.equipUpgradeCategories = equipUpgradeCategories;
                    that.equipUpgradeCategory = that.equipUpgrade.category ? $.extend({},$filter('byId')(equipUpgradeCategories, that.equipUpgrade.category),true) : {};
                }

                function setEquipUpgradeTiers(equipUpgradeTiers) {
                    that.equipUpgradeTiers = equipUpgradeTiers;
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

                that.createEquipUpgradeTiers = function() {
                    if(that.equipUpgrade.equip_upgrade_tiers.length == 0) {
                        that.equipUpgrade.equip_upgrade_tiers = [];
                        var equipUpgradeTiers = [
                            {
                                name: "I",
                                equip_upgrade: that.equipUpgrade.id
                            },{
                                name: "V",
                                equip_upgrade: that.equipUpgrade.id
                            }, {
                                name: "X",
                                equip_upgrade: that.equipUpgrade.id
                            }, {
                                name: "XV",
                                equip_upgrade: that.equipUpgrade.id
                            }, {
                                name: "XX",
                                equip_upgrade: that.equipUpgrade.id
                            }
                        ];

                        var count = equipUpgradeTiers.length;
                        for(var i=0;i<count;i++) {
                            EquipUpgradeTierService.addEquipUpgradeTier(equipUpgradeTiers[i]);
                        }
                    }
                };

                that.deleteEquipUpgradeTiers = function() {
                    if(that.equipUpgrade.equip_upgrade_tiers.length>0) {
                        var count = that.equipUpgrade.equip_upgrade_tiers.length;
                        for(var i=0;i<count;i++) {
                            var equipUpgradeTier = $filter('byId')(that.equipUpgradeTiers, that.equipUpgrade.equip_upgrade_tiers[i]);
                            EquipUpgradeTierService.deleteEquipUpgradeTier(equipUpgradeTier);
                        }
                    }
                };

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