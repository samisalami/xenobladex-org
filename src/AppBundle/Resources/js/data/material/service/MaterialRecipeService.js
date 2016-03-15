'use strict';

angular.module('app')
    .factory('MaterialRecipeService', MaterialRecipeService);

MaterialRecipeService.$inject = ['$http', '$filter'];

function MaterialRecipeService($http, $filter) {
    var onMaterialRecipesChangedCallbacks = [];
    var onMaterialRecipeDeletedCallbacks = [];
    var materialRecipes = null;
    var materialRecipesRequested = false;

    return {
        MaterialRecipe: MaterialRecipe,
        getMaterialRecipes: getMaterialRecipes,
        loadMaterialRecipes: loadMaterialRecipes,
        addMaterialRecipe: addMaterialRecipe,
        updateMaterialRecipe: updateMaterialRecipe,
        deleteMaterialRecipe: deleteMaterialRecipe,
        onMaterialRecipesChanged: onMaterialRecipesChanged,
        onMaterialRecipeDeleted: onMaterialRecipeDeleted,
        createFromResponse: createFromResponse
    };

    function MaterialRecipe(
        id,
        name,
        ticket_cost,
        credit_cost,
        body_part,
        is_not_buyable,
        rarity,
        show_monsters,
        monster_types,
        monsters)
    {
        this.id = id;
        this.name = name;
        this.ticket_cost = ticket_cost;
        this.credit_cost = credit_cost;
        this.body_part = body_part;
        this.is_not_buyable = is_not_buyable;
        this.rarity = rarity;
        this.show_monsters = show_monsters;
        this.monster_types = monster_types;
        this.monsters = monsters;

        Object.seal(this);
    }

    function getMaterialRecipes() {
        if(!materialRecipesRequested) {
            loadMaterialRecipes();
        } else {
            return materialRecipes;
        }
    }

    function createFromResponse(materialRecipe) {
        if (materialRecipe) {
            return new MaterialRecipe(
                materialRecipe['id'],
                materialRecipe['name'],
                materialRecipe['ticket_cost'],
                materialRecipe['credit_cost'],
                materialRecipe['body_part'],
                materialRecipe['is_not_buyable'],
                materialRecipe['rarity'],
                materialRecipe['show_monsters'],
                materialRecipe['monster_types'],
                materialRecipe['monsters']
            );
        }
    }

    function onMaterialRecipesChanged(callback) {
        onMaterialRecipesChangedCallbacks.push(callback);
    }

    function onMaterialRecipeDeleted(callback) {
        onMaterialRecipeDeletedCallbacks.push(callback);
    }

    function notifyMaterialRecipesChanged(materialRecipes) {
        onMaterialRecipesChangedCallbacks.forEach(function(callback){
            callback(materialRecipes);
        });
    }

    function notifyMaterialRecipeDeleted(materialRecipe) {
        onMaterialRecipeDeletedCallbacks.forEach(function(callback){
            callback(materialRecipe);
        });
    }

    function loadMaterialRecipes() {
        materialRecipesRequested = true;
        var url = Routing.generate('get_material_recipes');
        return $http
            .get(url)
            .then(function(response){
                materialRecipes = response.data.map(function(materialRecipe){
                    return createFromResponse(materialRecipe);
                });
                notifyMaterialRecipesChanged(materialRecipes);
            })
    }

    function addMaterialRecipe(materialRecipe) {
        var url = Routing.generate('add_material_recipe');
        return $http.post(url, materialRecipe)
            .then(function(response){
                materialRecipes.push(response.data);
                notifyMaterialRecipesChanged(materialRecipes);
                return response;
            });
    }

    function updateMaterialRecipe(materialRecipe) {
        var url = Routing.generate('update_material_recipe', {id: materialRecipe.id});
        return $http.put(url, materialRecipe)
            .then(function(response){
                var index = materialRecipes.indexOf($filter('byId')(materialRecipes, materialRecipe.id));
                materialRecipes.splice(index, 1, response.data);
                notifyMaterialRecipesChanged(materialRecipes);
                return response;
            });
    }

    function deleteMaterialRecipe(materialRecipe) {
        var url = Routing.generate('delete_material_recipe', {id: materialRecipe.id});
        return $http.delete(url)
            .then(function(response){
                var index = materialRecipes.indexOf($filter('byId')(materialRecipes, materialRecipe.id));
                materialRecipes.splice(index, 1);
                notifyMaterialRecipesChanged(materialRecipes);
                notifyMaterialRecipeDeleted(materialRecipe);
                return response;
            });
    }
}