'use strict';

angular.module('app')
    .directive('equipUpgradeTierForm',['EquipUpgradeTierService', 'MaterialRecipeService', 'ResourceRecipeService', '$filter', function(EquipUpgradeTierService, MaterialRecipeService, ResourceRecipeService, $filter) {
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
                    setFormNewMaterialRecipe(MaterialRecipeService.MaterialRecipe);
                    MaterialRecipeService.onMaterialRecipesChanged(setMaterialRecipeData);
                    setMaterialRecipeData(MaterialRecipeService.getMaterialRecipes());

                    setFormNewResourceRecipe(ResourceRecipeService.ResourceRecipe);
                    ResourceRecipeService.onResourceRecipesChanged(setResourceRecipeData);
                    setResourceRecipeData(ResourceRecipeService.getResourceRecipes());
                }

                function setMaterialRecipeData(materialRecipes) {
                    that.materialRecipes = materialRecipes;
                }
                function setResourceRecipeData(resourceRecipes) {
                    that.resourceRecipes = resourceRecipes;
                }

                function setFormEquipUpgradeTier(equipUpgrade) {
                    that.equipUpgradeTier = $.extend({}, equipUpgrade, true);
                }

                function setFormNewMaterialRecipe(materialRecipe) {
                    that.newMaterialRecipe = $.extend({}, materialRecipe, true);
                    that.newMaterialRecipe.equip_upgrade_tier = that.equipUpgradeTier.id;
                }

                function setFormNewResourceRecipe(resourceRecipe) {
                    that.newResourceRecipe = $.extend({}, resourceRecipe, true);
                    that.newResourceRecipe.equip_upgrade_tier = that.equipUpgradeTier.id;
                }

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