'use strict';

angular.module('app')
    .directive('materialRecipeForm',['MaterialRecipeService', 'MaterialService', '$filter', function(MaterialRecipeService, MaterialService, $filter) {
        return {
            restrict: 'E',
            replace: false,
            templateUrl: 'js/data/material/view/materialRecipeFormView.html',
            scope: {
                materialRecipeSealed: "=materialRecipe",
                addForm: "@",
                callback: "&"
            },
            controller: ['$scope',function($scope) {
                var that = this;
                init();

                function init() {
                    setFormMaterialRecipe($scope.materialRecipeSealed);

                    MaterialService.onMaterialsChanged(setMaterialData);
                    setMaterialData(MaterialService.getMaterials());
                }

                function setFormMaterialRecipe(materialRecipe) {
                    that.materialRecipe = $.extend({}, materialRecipe, true);
                }

                function setMaterialData(materials) {
                    that.materials = materials;
                    that.material = that.materialRecipe.material ? $.extend({},$filter('byId')(materials, that.materialRecipe.material),true) : {};
                }

                function setMaterial(callback) {
                    if(that.material.id || that.material.name) {
                        if(that.material.id) {
                            that.materialRecipe.material = that.material.id;
                            callback();
                        } else {
                            MaterialService.addMaterial(that.material).then(function(response) {
                                that.materialRecipe.material = response.data.id;
                                callback();
                            });
                        }
                    } else {
                        callback();
                    }
                }

                that.deleteMaterialRecipe = function() {
                    MaterialRecipeService.deleteMaterialRecipe(that.materialRecipe);
                };

                that.updateMaterialRecipe = function() {
                    if(!that.isUpdating) {
                        that.isUpdating = true;
                        setMaterial(function () {
                            if (that.materialRecipe.id) {
                                MaterialRecipeService.updateMaterialRecipe(that.materialRecipe);
                                setMaterialData(that.materials);
                                that.isUpdating = false;
                            } else {
                                MaterialRecipeService.addMaterialRecipe(that.materialRecipe);
                                setFormMaterialRecipe($scope.materialRecipeSealed);
                                setMaterialData(that.materials);
                                that.isUpdating = false;
                            }
                        });
                    }
                }
            }],
            controllerAs: 'form'
        }
    }]);