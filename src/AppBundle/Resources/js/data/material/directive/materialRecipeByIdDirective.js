angular.module('app')
    .directive('materialRecipeById',['$filter','MaterialRecipeService', function($filter, MaterialRecipeService) {
        return {
            restrict: 'A',
            link: function($scope, $element,$attrs){
                var materialRecipeId = $attrs.materialRecipeById;

                if(materialRecipeId) {
                    MaterialRecipeService.onMaterialRecipesChanged(setMaterialRecipeById);
                    setMaterialRecipeById(MaterialRecipeService.getMaterialRecipes());

                }

                function setMaterialRecipeById(materialRecipes) {
                    $scope.materialRecipeById = $filter('byId')(materialRecipes, materialRecipeId) || null;
                }
            }
        }
    }]);