angular.module('app')
    .directive('materialMissingData',['MaterialService', '$filter', function(MaterialService, $filter) {
        return {
            restrict: 'E',
            templateUrl: 'js/data/material/view/materialMissingDataView.html',
            replace: true,
            link: function($scope, $element,$attrs) {
                init();

                function init() {
                    MaterialService.onMaterialsChanged(setMaterials);
                    setMaterials(MaterialService.getMaterials());
                }

                function setMaterials(materials) {
                    $scope.missingDataArray = $filter('missingData')(materials);
                }
            }
        }
    }]);