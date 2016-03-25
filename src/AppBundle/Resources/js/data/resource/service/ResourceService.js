'use strict';

angular.module('app')
    .factory('ResourceService', ResourceService);

ResourceService.$inject = ['$http', '$filter'];

function ResourceService($http, $filter) {
    var onResourcesChangedCallbacks = [];
    var onResourceDeletedCallbacks = [];
    var resources = null;
    var resourcesRequested = false;

    return {
        Resource: Resource,
        getResources: getResources,
        loadResources: loadResources,
        addResource: addResource,
        updateResource: updateResource,
        deleteResource: deleteResource,
        onResourcesChanged: onResourcesChanged,
        onResourceDeleted: onResourceDeleted,
        createFromResponse: createFromResponse
    };

    function Resource(
        id,
        name,
        region,
        credit_cost,
        description,
        location_note,
        rarity)
    {
        this.id = id;
        this.name = name;
        this.region = region;
        this.credit_cost = credit_cost;
        this.description = description;
        this.location_note = location_note;
        this.rarity = rarity;

        Object.seal(this);
    }

    function getResources() {
        if(!resourcesRequested) {
            loadResources();
        } else {
            return resources;
        }
    }

    function createFromResponse(resource) {
        if (resource) {
            return new Resource(
                resource['id'],
                resource['name'],
                resource['region'],
                resource['credit_cost'],
                resource['description'],
                resource['location_note'],
                resource['rarity']
            );
        }
    }

    function onResourcesChanged(callback) {
        onResourcesChangedCallbacks.push(callback);
    }

    function onResourceDeleted(callback) {
        onResourceDeletedCallbacks.push(callback);
    }

    function notifyResourcesChanged(resources) {
        onResourcesChangedCallbacks.forEach(function(callback){
            callback(resources);
        });
    }

    function notifyResourceDeleted(resource) {
        onResourceDeletedCallbacks.forEach(function(callback){
            callback(resource);
        });
    }

    function loadResources() {
        resourcesRequested = true;
        var url = Routing.generate('get_resources');
        return $http
            .get(url)
            .then(function(response){
                resources = response.data.map(function(resource){
                    return createFromResponse(resource);
                });
                notifyResourcesChanged(resources);
            })
    }

    function addResource(resource) {
        var url = Routing.generate('add_resource');
        return $http.post(url, resource)
            .then(function(response){
                resources.push(response.data);
                notifyResourcesChanged(resources);
                return response;
            });
    }

    function updateResource(resource) {
        var url = Routing.generate('update_resource', {id: resource.id});
        return $http.put(url, resource)
            .then(function(response){
                var index = resources.indexOf($filter('byId')(resources, resource.id));
                resources.splice(index, 1, response.data);
                notifyResourcesChanged(resources);
                return response;
            });
    }

    function deleteResource(resource) {
        var url = Routing.generate('delete_resource', {id: resource.id});
        return $http.delete(url)
            .then(function(response){
                var index = resources.indexOf($filter('byId')(resources, resource.id));
                resources.splice(index, 1);
                notifyResourcesChanged(resources);
                notifyResourceDeleted(resource);
                return response;
            });
    }
}