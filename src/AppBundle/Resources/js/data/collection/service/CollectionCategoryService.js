'use strict';

angular.module('app')
    .factory('CollectionCategoryService', CollectionCategoryService);

CollectionCategoryService.$inject = ['$http', '$filter'];

function CollectionCategoryService($http, $filter) {
    var onCollectionCategoriesChangedCallbacks = [];
    var onCollectionCategoryDeletedCallbacks = [];
    var collectionCategories = null;
    var collectionCategoriesRequested = false;

    return {
        CollectionCategory: CollectionCategory,
        getCollectionCategories: getCollectionCategories,
        loadCollectionCategories: loadCollectionCategories,
        addCollectionCategory: addCollectionCategory,
        updateCollectionCategory: updateCollectionCategory,
        deleteCollectionCategory: deleteCollectionCategory,
        onCollectionCategoriesChanged: onCollectionCategoriesChanged,
        onCollectionCategoryDeleted: onCollectionCategoryDeleted,
        createFromResponse: createFromResponse
    };

    function CollectionCategory(
        id,
        name,
        prio)
    {
        this.id = id;
        this.name = name;
        this.prio = prio;

        Object.seal(this);
    }

    function getCollectionCategories() {
        if(!collectionCategoriesRequested) {
            loadCollectionCategories();
        } else {
            return collectionCategories;
        }
    }

    function createFromResponse(collectionCategory) {
        if (collectionCategory) {
            return new CollectionCategory(
                collectionCategory['id'],
                collectionCategory['name'],
                collectionCategory['prio']
            );
        }
    }

    function onCollectionCategoriesChanged(callback) {
        onCollectionCategoriesChangedCallbacks.push(callback);
    }

    function onCollectionCategoryDeleted(callback) {
        onCollectionCategoryDeletedCallbacks.push(callback);
    }

    function notifyCollectionCategoriesChanged(collectionCategories) {
        onCollectionCategoriesChangedCallbacks.forEach(function(callback){
            callback(collectionCategories);
        });
    }

    function notifyCollectionCategoryDeleted(collectionCategory) {
        onCollectionCategoryDeletedCallbacks.forEach(function(callback){
            callback(collectionCategory);
        });
    }

    function loadCollectionCategories() {
        collectionCategoriesRequested = true;
        var url = Routing.generate('get_collection_categories');
        return $http
            .get(url)
            .then(function(response){
                collectionCategories = response.data.map(function(collectionCategory){
                    return createFromResponse(collectionCategory);
                });
                notifyCollectionCategoriesChanged(collectionCategories);
            })
    }

    function addCollectionCategory(collectionCategory) {
        var url = Routing.generate('add_collection_category');
        return $http.post(url, collectionCategory)
            .then(function(response){
                collectionCategories.push(response.data);
                notifyCollectionCategoriesChanged(collectionCategories);
                return response;
            });
    }

    function updateCollectionCategory(collectionCategory) {
        var url = Routing.generate('update_collection_category', {id: collectionCategory.id});
        return $http.put(url, collectionCategory)
            .then(function(response){
                var index = collectionCategories.indexOf($filter('byId')(collectionCategories, collectionCategory.id));
                collectionCategories.splice(index, 1, response.data);
                notifyCollectionCategoriesChanged(collectionCategories);
                return response;
            });
    }

    function deleteCollectionCategory(collectionCategory) {
        var url = Routing.generate('delete_collection_category', {id: collectionCategory.id});
        return $http.delete(url)
            .then(function(response){
                var index = collectionCategories.indexOf($filter('byId')(collectionCategories, collectionCategory.id));
                collectionCategories.splice(index, 1);
                notifyCollectionCategoriesChanged(collectionCategories);
                notifyCollectionCategoryDeleted(collectionCategory);
                return response;
            });
    }
}