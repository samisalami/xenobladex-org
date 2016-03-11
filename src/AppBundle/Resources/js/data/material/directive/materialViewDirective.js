'use strict';

angular.module('app')
    .directive('materialView',['MaterialService','$filter', '$location', '$anchorScroll', '$timeout', function(MaterialService, $filter, $location, $anchorScroll, $timeout) {
        return {
            restrict: 'EA',
            controller: ['$scope',function($scope){
                var that = this;
                that.scrolled = false;
                init();

                function init() {
                    MaterialService.onMaterialsChanged(setMaterials);
                    setMaterials(MaterialService.getMaterials());
                }

                function setMaterials(materials) {
                    $scope.materials = materials;

                    var promise = $timeout(function(){
                        if($scope.materials) {
                            if($location.hash() && !that.scrolled) {
                                that.scrolled = true;
                                $anchorScroll();
                            }
                        }
                        $timeout.cancel(promise);
                    },0);
                }

                $scope.getValidCssClass = function(string) {
                    var regExp = new RegExp("[^A-Za-z0-9\-_]", "g");
                    return string.replace(regExp, '').toLowerCase();
                };
            }]
        }
    }]);