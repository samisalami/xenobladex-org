'use strict';

angular.module('app')
    .directive('equipUpgradeTierForm',['EquipUpgradeTierService', 'MaterialService','$filter', function(EquipUpgradeTierService, MaterialService, $filter) {
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
                    that.equipUpgradeTier = $scope.equipUpgradeTier;
                    MaterialService.onMaterialsChanged(setMaterialData);
                    setMaterialData(MaterialService.getMaterials());
                }

                function setMaterialData(materials) {
                    that.materialsData = materials;
                }

                that.updateEquipUpgradeTier = function() {
                    console.log(that.equipUpgradeTier);
                    //if(!that.isUpdating) {
                    //    that.isUpdating = true;
                    //    if(that.equipUpgradeTiers.id) {
                    //        EquipUpgradeTierService.updateEquipUpgradeTier(that.equipUpgradeTiers);
                    //        that.isUpdating = false;
                    //    } else {
                    //        EquipUpgradeTierService.addEquipUpgradeTier(that.equipUpgradeTiers);
                    //        //setFormequipUpgradeTiers($scope.equipUpgradeTiersSealed);
                    //        that.isUpdating = false;
                    //    }
                    //}
                }
            }],
            controllerAs: 'form'
        }
    }]);