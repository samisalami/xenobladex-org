'use strict';

angular.module('app')
    .factory('EquipUpgradeTierService', EquipUpgradeTierService);

EquipUpgradeTierService.$inject = ['$http', '$filter'];

function EquipUpgradeTierService($http, $filter) {
    var onEquipUpgradeTiersChangedCallbacks = [];
    var onEquipUpgradeTierDeletedCallbacks = [];
    var EquipUpgradeTiers = null;
    var EquipUpgradeTiersRequested = false;

    return {
        EquipUpgradeTier: EquipUpgradeTier,
        getEquipUpgradeTiers: getEquipUpgradeTiers,
        loadEquipUpgradeTiers: loadEquipUpgradeTiers,
        addEquipUpgradeTier: addEquipUpgradeTier,
        updateEquipUpgradeTier: updateEquipUpgradeTier,
        deleteEquipUpgradeTier: deleteEquipUpgradeTier,
        onEquipUpgradeTiersChanged: onEquipUpgradeTiersChanged,
        onEquipUpgradeTierDeleted: onEquipUpgradeTierDeleted,
        createFromResponse: createFromResponse
    };

    function EquipUpgradeTier(
        id,
        name,
        description,
        resource,
        resource_count,
        material_count,
        material_count_individual,
        material1_count,
        material2_count,
        material3_count,
        equip_upgrade,
        credit_cost)
    {
        this.id = id;
        this.name = name;
        this.description = description;
        this.resource = resource;
        this.resource_count = resource_count;
        this.material_count = material_count;
        this.material_count_individual = material_count_individual;
        this.material1_count = material1_count;
        this.material2_count = material2_count;
        this.material3_count = material3_count;
        this.equip_upgrade = equip_upgrade;
        this.credit_cost = credit_cost;

        Object.seal(this);
    }

    function getEquipUpgradeTiers() {
        if(!EquipUpgradeTiersRequested) {
            loadEquipUpgradeTiers();
        } else {
            return EquipUpgradeTiers;
        }
    }

    function createFromResponse(equipUpgradeTier) {
        if (equipUpgradeTier) {
            return new EquipUpgradeTier(
                equipUpgradeTier['id'],
                equipUpgradeTier['name'],
                equipUpgradeTier['description'],
                equipUpgradeTier['resource'],
                equipUpgradeTier['resource_count'],
                equipUpgradeTier['material_count'],
                equipUpgradeTier['material_count_individual'],
                equipUpgradeTier['material1_count'],
                equipUpgradeTier['material2_count'],
                equipUpgradeTier['material3_count'],
                equipUpgradeTier['equip_upgrade'],
                equipUpgradeTier['credit_cost']
            );
        }
    }

    function onEquipUpgradeTiersChanged(callback) {
        onEquipUpgradeTiersChangedCallbacks.push(callback);
    }

    function onEquipUpgradeTierDeleted(callback) {
        onEquipUpgradeTierDeletedCallbacks.push(callback);
    }

    function notifyEquipUpgradeTiersChanged(EquipUpgradeTiers) {
        onEquipUpgradeTiersChangedCallbacks.forEach(function(callback){
            callback(EquipUpgradeTiers);
        });
    }

    function notifyEquipUpgradeTierDeleted(EquipUpgradeTier) {
        onEquipUpgradeTierDeletedCallbacks.forEach(function(callback){
            callback(EquipUpgradeTier);
        });
    }

    function loadEquipUpgradeTiers() {
        EquipUpgradeTiersRequested = true;
        var url = Routing.generate('get_equip_upgrade_tiers');
        return $http
            .get(url)
            .then(function(response){
                EquipUpgradeTiers = response.data.map(function(EquipUpgradeTier){
                    return createFromResponse(EquipUpgradeTier);
                });
                notifyEquipUpgradeTiersChanged(EquipUpgradeTiers);
            })
    }

    function addEquipUpgradeTier(EquipUpgradeTier) {
        var url = Routing.generate('add_equip_upgrade_tier');
        return $http.post(url, EquipUpgradeTier)
            .then(function(response){
                EquipUpgradeTiers.push(response.data);
                notifyEquipUpgradeTiersChanged(EquipUpgradeTiers);
                return response;
            });
    }

    function updateEquipUpgradeTier(EquipUpgradeTier) {
        var url = Routing.generate('update_equip_upgrade_tier', {id: EquipUpgradeTier.id});
        return $http.put(url, EquipUpgradeTier)
            .then(function(response){
                var index = EquipUpgradeTiers.indexOf($filter('byId')(EquipUpgradeTiers, EquipUpgradeTier.id));
                EquipUpgradeTiers.splice(index, 1, response.data);
                notifyEquipUpgradeTiersChanged(EquipUpgradeTiers);
                return response;
            });
    }

    function deleteEquipUpgradeTier(EquipUpgradeTier) {
        var url = Routing.generate('delete_equip_upgrade_tier', {id: EquipUpgradeTier.id});
        return $http.delete(url)
            .then(function(response){
                var index = EquipUpgradeTiers.indexOf($filter('byId')(EquipUpgradeTiers, EquipUpgradeTier.id));
                EquipUpgradeTiers.splice(index, 1);
                notifyEquipUpgradeTiersChanged(EquipUpgradeTiers);
                notifyEquipUpgradeTierDeleted(EquipUpgradeTier);
                return response;
            });
    }
}