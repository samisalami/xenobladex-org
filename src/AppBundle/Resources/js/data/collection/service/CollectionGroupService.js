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
        collection_category)
    {
        this.id = id;
        this.reward_sp = reward_sp;
        this.reward_item = reward_item;
        this.collection = collection;
        this.collection_category = collection_category;

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
                collectionGroup['collection_category']
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