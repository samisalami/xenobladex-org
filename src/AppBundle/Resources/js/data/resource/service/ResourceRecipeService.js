'use strict';

angular.module('app')
    .factory('ResourceRecipeService', ResourceRecipeService);

ResourceRecipeService.$inject = ['$http', '$filter'];

function ResourceRecipeService($http, $filter) {
    var onResourceRecipesChangedCallbacks = [];
    var onResourceRecipeDeletedCallbacks = [];
    var resourceRecipes = null;
    var resourceRecipesRequested = false;

    return {
        ResourceRecipe: ResourceRecipe,
        getResourceRecipes: getResourceRecipes,
        loadResourceRecipes: loadResourceRecipes,
        addResourceRecipe: addResourceRecipe,
        updateResourceRecipe: updateResourceRecipe,
        deleteResourceRecipe: deleteResourceRecipe,
        onResourceRecipesChanged: onResourceRecipesChanged,
        onResourceRecipeDeleted: onResourceRecipeDeleted,
        createFromResponse: createFromResponse
    };

    function ResourceRecipe(
        id,
        count,
        resource,
        equip_upgrade_tier)
    {
        this.id = id;
        this.count = count;
        this.resource = resource;
        this.equip_upgrade_tier = equip_upgrade_tier;

        Object.seal(this);
    }

    function getResourceRecipes() {
        if(!resourceRecipesRequested) {
            loadResourceRecipes();
        } else {
            return resourceRecipes;
        }
    }

    function createFromResponse(resourceRecipe) {
        if (resourceRecipe) {
            return new ResourceRecipe(
                resourceRecipe['id'],
                resourceRecipe['count'],
                resourceRecipe['resource'],
                resourceRecipe['equip_upgrade_tier']
            );
        }
    }

    function onResourceRecipesChanged(callback) {
        onResourceRecipesChangedCallbacks.push(callback);
    }

    function onResourceRecipeDeleted(callback) {
        onResourceRecipeDeletedCallbacks.push(callback);
    }

    function notifyResourceRecipesChanged(resourceRecipes) {
        onResourceRecipesChangedCallbacks.forEach(function(callback){
            callback(resourceRecipes);
        });
    }

    function notifyResourceRecipeDeleted(resourceRecipe) {
        onResourceRecipeDeletedCallbacks.forEach(function(callback){
            callback(resourceRecipe);
        });
    }

    function loadResourceRecipes() {
        resourceRecipesRequested = true;
        var url = Routing.generate('get_resource_recipes');
        return $http
            .get(url)
            .then(function(response){
                resourceRecipes = response.data.map(function(resourceRecipe){
                    return createFromResponse(resourceRecipe);
                });
                notifyResourceRecipesChanged(resourceRecipes);
            })
    }

    function addResourceRecipe(resourceRecipe) {
        var url = Routing.generate('add_resource_recipe');
        return $http.post(url, resourceRecipe)
            .then(function(response){
                resourceRecipes.push(response.data);
                notifyResourceRecipesChanged(resourceRecipes);
                return response;
            });
    }

    function updateResourceRecipe(resourceRecipe) {
        var url = Routing.generate('update_resource_recipe', {id: resourceRecipe.id});
        return $http.put(url, resourceRecipe)
            .then(function(response){
                var index = resourceRecipes.indexOf($filter('byId')(resourceRecipes, resourceRecipe.id));
                resourceRecipes.splice(index, 1, response.data);
                notifyResourceRecipesChanged(resourceRecipes);
                return response;
            });
    }

    function deleteResourceRecipe(resourceRecipe) {
        var url = Routing.generate('delete_resource_recipe', {id: resourceRecipe.id});
        return $http.delete(url)
            .then(function(response){
                var index = resourceRecipes.indexOf($filter('byId')(resourceRecipes, resourceRecipe.id));
                resourceRecipes.splice(index, 1);
                notifyResourceRecipesChanged(resourceRecipes);
                notifyResourceRecipeDeleted(resourceRecipe);
                return response;
            });
    }
}