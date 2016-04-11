'use strict';

angular.module('app')
    .factory('EquipUpgradeService', EquipUpgradeService);

EquipUpgradeService.$inject = ['$http', '$filter'];

function EquipUpgradeService($http, $filter) {
    var onEquipUpgradesChangedCallbacks = [];
    var onEquipUpgradeDeletedCallbacks = [];
    var equipUpgrades = null;
    var equipUpgradesRequested = false;

    return {
        EquipUpgrade: EquipUpgrade,
        getEquipUpgrades: getEquipUpgrades,
        loadEquipUpgrades: loadEquipUpgrades,
        addEquipUpgrade: addEquipUpgrade,
        updateEquipUpgrade: updateEquipUpgrade,
        deleteEquipUpgrade: deleteEquipUpgrade,
        onEquipUpgradesChanged: onEquipUpgradesChanged,
        onEquipUpgradeDeleted: onEquipUpgradeDeleted,
        createFromResponse: createFromResponse
    };

    function EquipUpgrade(
        id,
        name,
        description,
        is_not_manufacturable,
        category,
        material_small1,
        material_small2,
        material_small3,
        material_small1_count,
        material_small2_count,
        material_small3_count,
        material_large1,
        material_large2,
        material_large3,
        material_large1_count,
        material_large2_count,
        material_large3_count,
        category_name,
        category_description,
        equip_upgrade_tiers)
    {
        this.id = id;
        this.name = name;
        this.description = description;
        this.is_not_manufacturable = is_not_manufacturable;
        this.category = category;
        this.material_small1 = material_small1;
        this.material_small2 = material_small2;
        this.material_small3 = material_small3;
        this.material_small1_count = material_small1_count;
        this.material_small2_count = material_small2_count;
        this.material_small3_count = material_small3_count;
        this.material_large1 = material_large1;
        this.material_large2 = material_large2;
        this.material_large3 = material_large3;
        this.material_large1_count = material_large1_count;
        this.material_large2_count = material_large2_count;
        this.material_large3_count = material_large3_count;
        this.category_name = category_name;
        this.category_description = category_description;
        this.equip_upgrade_tiers = equip_upgrade_tiers;

        Object.seal(this);
    }

    function getEquipUpgrades() {
        if(!equipUpgradesRequested) {
            loadEquipUpgrades();
        } else {
            return equipUpgrades;
        }
    }

    function createFromResponse(equipUpgrade) {
        if (equipUpgrade) {
            return new EquipUpgrade(
                equipUpgrade['id'],
                equipUpgrade['name'],
                equipUpgrade['description'],
                equipUpgrade['is_not_manufacturable'],
                equipUpgrade['category'],
                equipUpgrade['material_small1'],
                equipUpgrade['material_small2'],
                equipUpgrade['material_small3'],
                equipUpgrade['material_small1_count'],
                equipUpgrade['material_small2_count'],
                equipUpgrade['material_small3_count'],
                equipUpgrade['material_large1'],
                equipUpgrade['material_large2'],
                equipUpgrade['material_large3'],
                equipUpgrade['material_large1_count'],
                equipUpgrade['material_large2_count'],
                equipUpgrade['material_large3_count'],
                equipUpgrade['category_name'],
                equipUpgrade['category_description'],
                equipUpgrade['equip_upgrade_tiers']
            );
        }
    }

    function onEquipUpgradesChanged(callback) {
        onEquipUpgradesChangedCallbacks.push(callback);
    }

    function onEquipUpgradeDeleted(callback) {
        onEquipUpgradeDeletedCallbacks.push(callback);
    }

    function notifyEquipUpgradesChanged(equipUpgrades) {
        onEquipUpgradesChangedCallbacks.forEach(function(callback){
            callback(equipUpgrades);
        });
    }

    function notifyEquipUpgradeDeleted(equipUpgrade) {
        onEquipUpgradeDeletedCallbacks.forEach(function(callback){
            callback(equipUpgrade);
        });
    }

    function loadEquipUpgrades() {
        equipUpgradesRequested = true;
        var url = Routing.generate('get_equip_upgrades');
        return $http
            .get(url)
            .then(function(response){
                equipUpgrades = response.data.map(function(equipUpgrade){
                    return createFromResponse(equipUpgrade);
                });
                notifyEquipUpgradesChanged(equipUpgrades);
            })
    }

    function addEquipUpgrade(equipUpgrade) {
        var url = Routing.generate('add_equip_upgrade');
        return $http.post(url, equipUpgrade)
            .then(function(response){
                equipUpgrades.push(response.data);
                notifyEquipUpgradesChanged(equipUpgrades);
                return response;
            });
    }

    function updateEquipUpgrade(equipUpgrade) {
        var url = Routing.generate('update_equip_upgrade', {id: equipUpgrade.id});
        return $http.put(url, equipUpgrade)
            .then(function(response){
                var index = equipUpgrades.indexOf($filter('byId')(equipUpgrades, equipUpgrade.id));
                equipUpgrades.splice(index, 1, response.data);
                notifyEquipUpgradesChanged(equipUpgrades);
                return response;
            });
    }

    function deleteEquipUpgrade(equipUpgrade) {
        var url = Routing.generate('delete_equip_upgrade', {id: equipUpgrade.id});
        return $http.delete(url)
            .then(function(response){
                var index = equipUpgrades.indexOf($filter('byId')(equipUpgrades, equipUpgrade.id));
                equipUpgrades.splice(index, 1);
                notifyEquipUpgradesChanged(equipUpgrades);
                notifyEquipUpgradeDeleted(equipUpgrade);
                return response;
            });
    }
}