'use strict';

angular.module('app')
    .directive('materialAdmin',['MaterialService', 'flashService', '$filter', function(MaterialService, flashService, $filter) {
        return {
            replace: true,
            controller: ['$scope',function($scope) {
                var that = this;
                init();

                function init() {
                    MaterialService.onMaterialsChanged(setMaterials);
                    MaterialService.onMaterialDeleted(setDeletedMaterial);
                    setMaterials(MaterialService.getMaterials());

                    that.newMaterial = MaterialService.Material;
                }

                function setMaterials(materials) {
                    that.materials = materials;
                }

                function setDeletedMaterial(material) {
                    that.deletedMaterial = material;
                    delete that.deletedMaterial.id;
                }

                that.addDeletedMaterial = function() {
                    MaterialService.addMaterial(that.deletedMaterial);
                    delete that.deletedMaterial;
                };
            }],
            controllerAs: 'vm'
        }
    }]);