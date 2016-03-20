'use strict';

angular.module('app')
    .factory('CollectionService', CollectionService);

CollectionService.$inject = ['$http', '$filter'];

function CollectionService($http, $filter) {
    var onCollectionsChangedCallbacks = [];
    var onCollectionDeletedCallbacks = [];
    var collections = null;
    var collectionsRequested = false;

    return {
        Collection: Collection,
        getCollections: getCollections,
        loadCollections: loadCollections,
        addCollection: addCollection,
        updateCollection: updateCollection,
        deleteCollection: deleteCollection,
        onCollectionsChanged: onCollectionsChanged,
        onCollectionDeleted: onCollectionDeleted,
        createFromResponse: createFromResponse
    };

    function Collection(
        id,
        region,
        reward_sp,
        reward_item)
    {
        this.id = id;
        this.region = region;
        this.reward_sp = reward_sp;
        this.reward_item = reward_item;

        Object.seal(this);
    }

    function getCollections() {
        if(!collectionsRequested) {
            loadCollections();
        } else {
            return collections;
        }
    }

    function createFromResponse(collection) {
        if (collection) {
            return new Collection(
                collection['id'],
                collection['region'],
                collection['reward_sp'],
                collection['reward_item']
            );
        }
    }

    function onCollectionsChanged(callback) {
        onCollectionsChangedCallbacks.push(callback);
    }

    function onCollectionDeleted(callback) {
        onCollectionDeletedCallbacks.push(callback);
    }

    function notifyCollectionsChanged(collections) {
        onCollectionsChangedCallbacks.forEach(function(callback){
            callback(collections);
        });
    }

    function notifyCollectionDeleted(collection) {
        onCollectionDeletedCallbacks.forEach(function(callback){
            callback(collection);
        });
    }

    function loadCollections() {
        collectionsRequested = true;
        var url = Routing.generate('get_collections');
        return $http
            .get(url)
            .then(function(response){
                collections = response.data.map(function(collection){
                    return createFromResponse(collection);
                });
                notifyCollectionsChanged(collections);
            })
    }

    function addCollection(collection) {
        var url = Routing.generate('add_collection');
        return $http.post(url, collection)
            .then(function(response){
                collections.push(response.data);
                notifyCollectionsChanged(collections);
                return response;
            });
    }

    function updateCollection(collection) {
        var url = Routing.generate('update_collection', {id: collection.id});
        return $http.put(url, collection)
            .then(function(response){
                var index = collections.indexOf($filter('byId')(collections, collection.id));
                collections.splice(index, 1, response.data);
                notifyCollectionsChanged(collections);
                return response;
            });
    }

    function deleteCollection(collection) {
        var url = Routing.generate('delete_collection', {id: collection.id});
        return $http.delete(url)
            .then(function(response){
                var index = collections.indexOf($filter('byId')(collections, collection.id));
                collections.splice(index, 1);
                notifyCollectionsChanged(collections);
                notifyCollectionDeleted(collection);
                return response;
            });
    }
}