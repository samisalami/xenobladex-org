'use strict';

angular.module('app')
    .directive('materialView',['MaterialService','$filter', function(MaterialService, $filter) {
        return {
            restrict: 'EA',
            link: function($scope, $element,$attrs){
                init();

                function init() {
                    MaterialService.onMaterialsChanged(setMaterials);
                    setMaterials(MaterialService.getMaterials());
                }

                function setMaterials(materials) {
                    $scope.materials = materials;
                }

                $scope.getValidCssClass = function(string) {
                    var regExp = new RegExp("[^A-Za-z0-9\-_]", "g");
                    return string.replace(regExp, '').toLowerCase();
                };
            }
        }
    }]);