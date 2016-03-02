'use strict';

angular.module('app')
    .factory('MaterialService', MaterialService);

MaterialService.$inject = ['$http'];

function MaterialService($http) {
    var onMaterialsChangedCallbacks = [];
    var onMaterialDeletedCallbacks = [];
    var materials = null;
    var materialsRequested = false;

    return {
        Material: Material,
        getMaterials: getMaterials,
        loadMaterials: loadMaterials,
        addMaterial: addMaterial,
        updateMaterial: updateMaterial,
        deleteMaterial: deleteMaterial,
        onMaterialsChanged: onMaterialsChanged,
        onMaterialDeleted: onMaterialDeleted,
        createFromResponse: createFromResponse
    };

    function Material(
        id,
        name,
        ticket_cost,
        credit_cost,
        body_part,
        is_not_buyable,
        rarity,
        show_monsters)
    {
        this.id = id;
        this.name = name;
        this.ticket_cost = ticket_cost;
        this.credit_cost = credit_cost;
        this.body_part = body_part;
        this.is_not_buyable = is_not_buyable;
        this.rarity = rarity;
        this.show_monsters = show_monsters;

        Object.seal(this);
    }

    function getMaterials() {
        if(!materialsRequested) {
            loadMaterials();
        } else {
            return materials;
        }
    }

    function createFromResponse(material) {
        if (material) {
            return new Material(
                material['id'],
                material['name'],
                material['ticket_cost'],
                material['credit_cost'],
                material['body_part'],
                material['is_not_buyable'],
                material['rarity'],
                material['show_monsters']
            );
        }
    }

    function onMaterialsChanged(callback) {
        onMaterialsChangedCallbacks.push(callback);
    }

    function onMaterialDeleted(callback) {
        onMaterialDeletedCallbacks.push(callback);
    }

    function notifyMaterialsChanged(materials) {
        onMaterialsChangedCallbacks.forEach(function(callback){
            callback(materials);
        });
    }

    function notifyMaterialDeleted(material) {
        onMaterialDeletedCallbacks.forEach(function(callback){
            callback(material);
        });
    }

    function loadMaterials() {
        materialsRequested = true;
        var url = Routing.generate('get_materials');
        return $http
            .get(url)
            .then(function(response){
                materials = response.data.map(function(material){
                    return createFromResponse(material);
                });
                notifyMaterialsChanged(materials);
            })
    }

    function addMaterial(material) {
        var url = Routing.generate('add_material');
        return $http.post(url, material)
            .then(function(response){
                loadMaterials();
                return response;
            });
    }

    function updateMaterial(material) {
        var url = Routing.generate('update_material', {id: material.id});
        return $http.put(url, material)
            .then(function(response){
                loadMaterials();
                return response;
            });
    }

    function deleteMaterial(material) {
        var url = Routing.generate('delete_material', {id: material.id});
        return $http.delete(url)
            .then(function(response){
                loadMaterials();
                notifyMaterialDeleted(material);
                return response;
            });
    }
}