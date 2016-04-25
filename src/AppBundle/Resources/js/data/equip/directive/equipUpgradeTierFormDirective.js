'use strict';

angular.module('app')
    .directive('equipUpgradeTierForm',['EquipUpgradeTierService', 'ResourceService', 'MaterialService', '$filter', function(EquipUpgradeTierService, ResourceService, MaterialService, $filter) {
        return {
            restrict: 'E',
            replace: false,
            templateUrl: 'js/data/equip/view/equipUpgradeTierFormView.html',
            scope: {
                equipUpgradeTier: "="
            },
            controller: ['$scope',function($scope) {
                var that = this;
                init();

                function init() {
                    setFormEquipUpgradeTier($scope.equipUpgradeTier);

                    ResourceService.onResourcesChanged(setResources);
                    setResources(ResourceService.getResources());

                    MaterialService.onMaterialsChanged(setMaterials);
                    setMaterials(MaterialService.getMaterials());
                }

                function setFormEquipUpgradeTier(equipUpgrade) {
                    that.equipUpgradeTier = $.extend({}, equipUpgrade, true);
                }

                function setResources(resources) {
                    that.resources = resources;
                }

                function setMaterials(materials) {
                    that.materials = materials;
                }

                that.deleteEquipUpgradeTier = function() {
                    EquipUpgradeTierService.deleteEquipUpgradeTier(that.equipUpgradeTier);
                };

                that.updateEquipUpgradeTier = function() {
                    if(that.equipUpgradeTier.id) {
                        EquipUpgradeTierService.updateEquipUpgradeTier(that.equipUpgradeTier);
                    } else {
                        EquipUpgradeTierService.addEquipUpgradeTier(that.equipUpgradeTier);
                        setFormEquipUpgradeTier($scope.equipUpgradeTier);
                    }
                }
            }],
            controllerAs: 'form'
        }
    }]);