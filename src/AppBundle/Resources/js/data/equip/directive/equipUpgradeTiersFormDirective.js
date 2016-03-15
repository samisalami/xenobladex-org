'use strict';

angular.module('app')
    .directive('equipUpgradeTiersForm',['EquipUpgradeTierService', 'MaterialService','$filter', function(EquipUpgradeTierService, MaterialService, $filter) {
        return {
            restrict: 'E',
            replace: false,
            templateUrl: 'js/data/equip/view/equipUpgradeTiersFormView.html',
            scope: {
                equipUpgrade: "=equipUpgrade"
            },
            controller: ['$scope',function($scope) {
                var that = this;
                init();

                function init() {
                    EquipUpgradeTierService.onEquipUpgradeTiersChanged(setEquipUpgradeTiers);
                    setEquipUpgradeTiers(EquipUpgradeTierService.getEquipUpgradeTiers());

                    MaterialService.onMaterialsChanged(setMaterialData);
                    setMaterialData(MaterialService.getMaterials());
                }

                function setEquipUpgradeTiers(equipUpgradeTiers) {
                    that.equipUpgradeTiers = equipUpgradeTiers;
                    setFormequipUpgradeTiers($scope.equipUpgrade);
                }

                function setFormequipUpgradeTiers(equipUpgrade) {
                    that.equipUpgradeTiers = [
                        {
                            name: "I"
                        },{
                            name: "V"
                        }, {
                            name: "X"
                        }, {
                            name: "XV"
                        }, {
                            name: "XX"
                        }
                    ];

                    if(equipUpgrade.id) {
                        var equipUpgradeTiers = $filter('filter')(that.equipUpgradeTiers, {equip_upgrade: equipUpgrade.id});
                        if(equipUpgradeTiers.length > 0) {
                            that.equipUpgradeTiers = equipUpgradeTiers;
                        }
                    }
                }

                function setMaterialData(materials) {
                    that.materialsData = materials;
                }

                that.deleteEquipUpgradeTiers = function() {
                    EquipUpgradeTierService.deleteEquipUpgradeTier(that.equipUpgradeTiers);
                };

                that.updateEquipUpgradeTiers = function() {
                    if(!that.isUpdating) {
                        that.isUpdating = true;
                        if(that.equipUpgradeTiers.id) {
                            EquipUpgradeTierService.updateEquipUpgradeTier(that.equipUpgradeTiers);
                            that.isUpdating = false;
                        } else {
                            EquipUpgradeTierService.addEquipUpgradeTier(that.equipUpgradeTiers);
                            //setFormequipUpgradeTiers($scope.equipUpgradeTiersSealed);
                            that.isUpdating = false;
                        }
                    }
                }
            }],
            controllerAs: 'form'
        }
    }]);