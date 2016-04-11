angular.module('app')
    .directive('materialById',['$filter','MaterialService', function($filter, MaterialService) {
        return {
            restrict: 'A',
            scope: true,
            link: function($scope, $element,$attrs){
                var materialId = $attrs.materialById;

                if(materialId) {
                    MaterialService.onMaterialsChanged(setMaterialById);
                    setMaterialById(MaterialService.getMaterials());
                }

                function setMaterialById(materials) {
                    $scope.materialById = $filter('byId')(materials, materialId) || null;
                }
            }
        }
    }]);