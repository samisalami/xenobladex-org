'use strict';

angular.module('app')
    .directive('equipUpgradeForm',['EquipUpgradeService', 'EquipUpgradeCategoryService', 'EquipUpgradeTierService', 'MaterialService', '$filter', function(EquipUpgradeService, EquipUpgradeCategoryService, EquipUpgradeTierService, MaterialService, $filter) {
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

                    MaterialService.onMaterialsChanged(setMaterials);
                    setMaterials(MaterialService.getMaterials());
                }

                function setEquipUpgradeCategoriesData(equipUpgradeCategories) {
                    that.equipUpgradeCategories = equipUpgradeCategories;
                    that.equipUpgradeCategory = that.equipUpgrade.category ? $.extend({},$filter('byId')(equipUpgradeCategories, that.equipUpgrade.category),true) : {};
                }

                function setEquipUpgradeTiers(equipUpgradeTiers) {
                    that.equipUpgradeTiers = equipUpgradeTiers;
                }

                function setMaterials(materials) {
                    that.materials = materials;
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
                    if($filter('filter')(that.equipUpgradeTiers, {equip_upgrade: that.equipUpgrade.id}).length == 0) {
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

                //that.deleteEquipUpgradeTiers = function() {
                //    var equipUpgradeTiers = $filter('filter')(that.equipUpgradeTiers, {equip_upgrade: that.equipUpgrade.id});
                //    if(equipUpgradeTiers.length>0) {
                //        var count = equipUpgradeTiers.length;
                //        for(var i=0;i<count;i++) {
                //            EquipUpgradeTierService.deleteEquipUpgradeTier(equipUpgradeTiers[i]);
                //        }
                //    }
                //};

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