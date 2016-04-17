'use strict';

angular.module('app')
    .factory('CollectionGroupService', CollectionGroupService);

CollectionGroupService.$inject = ['$http', '$filter'];

function CollectionGroupService($http, $filter) {
    var onCollectionGroupsChangedCallbacks = [];
    var onCollectionGroupDeletedCallbacks = [];
    var collectionGroups = null;
    var collectionGroupsRequested = false;

    return {
        CollectionGroup: CollectionGroup,
        getCollectionGroups: getCollectionGroups,
        loadCollectionGroups: loadCollectionGroups,
        addCollectionGroup: addCollectionGroup,
        updateCollectionGroup: updateCollectionGroup,
        deleteCollectionGroup: deleteCollectionGroup,
        onCollectionGroupsChanged: onCollectionGroupsChanged,
        onCollectionGroupDeleted: onCollectionGroupDeleted,
        createFromResponse: createFromResponse
    };

    function CollectionGroup(
        id,
        reward_sp,
        reward_item,
        collection,
        collection_category,
        collection_category_prio,
        collection_category_name,
        collectible1,
        collectible2,
        collectible3,
        collectible4,
        collectible5,
        collectible6,
        collectible7,
        collectible8)
    {
        this.id = id;
        this.reward_sp = reward_sp;
        this.reward_item = reward_item;
        this.collection = collection;
        this.collection_category = collection_category;
        this.collection_category_prio = collection_category_prio;
        this.collection_category_name = collection_category_name;
        this.collectible1 = collectible1;
        this.collectible2 = collectible2;
        this.collectible3 = collectible3;
        this.collectible4 = collectible4;
        this.collectible5 = collectible5;
        this.collectible6 = collectible6;
        this.collectible7 = collectible7;
        this.collectible8 = collectible8;

        Object.seal(this);
    }

    function getCollectionGroups() {
        if(!collectionGroupsRequested) {
            loadCollectionGroups();
        } else {
            return collectionGroups;
        }
    }

    function createFromResponse(collectionGroup) {
        if (collectionGroup) {
            return new CollectionGroup(
                collectionGroup['id'],
                collectionGroup['reward_sp'],
                collectionGroup['reward_item'],
                collectionGroup['collection'],
                collectionGroup['collection_category'],
                collectionGroup['collection_category_prio'],
                collectionGroup['collection_category_name'],
                collectionGroup['collectible1'],
                collectionGroup['collectible2'],
                collectionGroup['collectible3'],
                collectionGroup['collectible4'],
                collectionGroup['collectible5'],
                collectionGroup['collectible6'],
                collectionGroup['collectible7'],
                collectionGroup['collectible8']
            );
        }
    }

    function onCollectionGroupsChanged(callback) {
        onCollectionGroupsChangedCallbacks.push(callback);
    }

    function onCollectionGroupDeleted(callback) {
        onCollectionGroupDeletedCallbacks.push(callback);
    }

    function notifyCollectionGroupsChanged(collectionGroups) {
        onCollectionGroupsChangedCallbacks.forEach(function(callback){
            callback(collectionGroups);
        });
    }

    function notifyCollectionGroupDeleted(collectionGroup) {
        onCollectionGroupDeletedCallbacks.forEach(function(callback){
            callback(collectionGroup);
        });
    }

    function loadCollectionGroups() {
        collectionGroupsRequested = true;
        var url = Routing.generate('get_collection_groups');
        return $http
            .get(url)
            .then(function(response){
                collectionGroups = response.data.map(function(collectionGroup){
                    return createFromResponse(collectionGroup);
                });
                notifyCollectionGroupsChanged(collectionGroups);
            })
    }

    function addCollectionGroup(collectionGroup) {
        var url = Routing.generate('add_collection_group');
        return $http.post(url, collectionGroup)
            .then(function(response){
                collectionGroups.push(response.data);
                notifyCollectionGroupsChanged(collectionGroups);
                return response;
            });
    }

    function updateCollectionGroup(collectionGroup) {
        var url = Routing.generate('update_collection_group', {id: collectionGroup.id});
        return $http.put(url, collectionGroup)
            .then(function(response){
                var index = collectionGroups.indexOf($filter('byId')(collectionGroups, collectionGroup.id));
                collectionGroups.splice(index, 1, response.data);
                notifyCollectionGroupsChanged(collectionGroups);
                return response;
            });
    }

    function deleteCollectionGroup(collectionGroup) {
        var url = Routing.generate('delete_collection_group', {id: collectionGroup.id});
        return $http.delete(url)
            .then(function(response){
                var index = collectionGroups.indexOf($filter('byId')(collectionGroups, collectionGroup.id));
                collectionGroups.splice(index, 1);
                notifyCollectionGroupsChanged(collectionGroups);
                notifyCollectionGroupDeleted(collectionGroup);
                return response;
            });
    }
}