'use strict';

angular.module('app')
    .factory('CollectibleService', CollectibleService);

CollectibleService.$inject = ['$http', '$filter'];

function CollectibleService($http, $filter) {
    var onCollectiblesChangedCallbacks = [];
    var onCollectibleDeletedCallbacks = [];
    var collectibles = null;
    var collectiblesRequested = false;

    return {
        Collectible: Collectible,
        getCollectibles: getCollectibles,
        loadCollectibles: loadCollectibles,
        addCollectible: addCollectible,
        updateCollectible: updateCollectible,
        deleteCollectible: deleteCollectible,
        onCollectiblesChanged: onCollectiblesChanged,
        onCollectibleDeleted: onCollectibleDeleted,
        createFromResponse: createFromResponse
    };

    function Collectible(
        id,
        name,
        description,
        rarity,
        location_note)
    {
        this.id = id;
        this.name = name;
        this.description = description;
        this.rarity = rarity;
        this.location_note = location_note;

        Object.seal(this);
    }

    function getCollectibles() {
        if(!collectiblesRequested) {
            loadCollectibles();
        } else {
            return collectibles;
        }
    }

    function createFromResponse(collectible) {
        if (collectible) {
            return new Collectible(
                collectible['id'],
                collectible['name'],
                collectible['description'],
                collectible['rarity'],
                collectible['location_note']
            );
        }
    }

    function onCollectiblesChanged(callback) {
        onCollectiblesChangedCallbacks.push(callback);
    }

    function onCollectibleDeleted(callback) {
        onCollectibleDeletedCallbacks.push(callback);
    }

    function notifyCollectiblesChanged(collectibles) {
        onCollectiblesChangedCallbacks.forEach(function(callback){
            callback(collectibles);
        });
    }

    function notifyCollectibleDeleted(collectible) {
        onCollectibleDeletedCallbacks.forEach(function(callback){
            callback(collectible);
        });
    }

    function loadCollectibles() {
        collectiblesRequested = true;
        var url = Routing.generate('get_collectibles');
        return $http
            .get(url)
            .then(function(response){
                collectibles = response.data.map(function(collectible){
                    return createFromResponse(collectible);
                });
                notifyCollectiblesChanged(collectibles);
            })
    }

    function addCollectible(collectible) {
        var url = Routing.generate('add_collectible');
        return $http.post(url, collectible)
            .then(function(response){
                collectibles.push(response.data);
                notifyCollectiblesChanged(collectibles);
                return response;
            });
    }

    function updateCollectible(collectible) {
        var url = Routing.generate('update_collectible', {id: collectible.id});
        return $http.put(url, collectible)
            .then(function(response){
                var index = collectibles.indexOf($filter('byId')(collectibles, collectible.id));
                collectibles.splice(index, 1, response.data);
                notifyCollectiblesChanged(collectibles);
                return response;
            });
    }

    function deleteCollectible(collectible) {
        var url = Routing.generate('delete_collectible', {id: collectible.id});
        return $http.delete(url)
            .then(function(response){
                var index = collectibles.indexOf($filter('byId')(collectibles, collectible.id));
                collectibles.splice(index, 1);
                notifyCollectiblesChanged(collectibles);
                notifyCollectibleDeleted(collectible);
                return response;
            });
    }
}