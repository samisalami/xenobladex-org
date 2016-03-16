'use strict';

angular.module('app')
    .directive('equipUpgradeTierForm',['EquipUpgradeTierService', 'MaterialRecipeService','$filter', function(EquipUpgradeTierService, MaterialRecipeService, $filter) {
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
                }

                function setMaterialRecipeData(materialRecipes) {
                    that.materialRecipes = materialRecipes;
                }

                function setFormEquipUpgradeTier(equipUpgrade) {
                    that.equipUpgradeTier = $.extend({}, equipUpgrade, true);
                }

                function setFormNewMaterialRecipe(materialRecipe) {
                    that.newMaterialRecipe = $.extend({}, materialRecipe, true);
                    that.newMaterialRecipe.equip_upgrade_tier = that.equipUpgradeTier.id;
                }
            }],
            controllerAs: 'form'
        }
    }]);