'use strict';

angular.module('app')
    .factory('EquipUpgradeCategoryService', EquipUpgradeCategoryService);

EquipUpgradeCategoryService.$inject = ['$http', '$filter'];

function EquipUpgradeCategoryService($http, $filter) {
    var onEquipUpgradeCategoriesChangedCallbacks = [];
    var onEquipUpgradeCategoryDeletedCallbacks = [];
    var equipUpgradeCategories = null;
    var equipUpgradeCategoriesRequested = false;

    return {
        EquipUpgradeCategory: EquipUpgradeCategory,
        getEquipUpgradeCategories: getEquipUpgradeCategories,
        loadEquipUpgradeCategories: loadEquipUpgradeCategories,
        addEquipUpgradeCategory: addEquipUpgradeCategory,
        updateEquipUpgradeCategory: updateEquipUpgradeCategory,
        deleteEquipUpgradeCategory: deleteEquipUpgradeCategory,
        onEquipUpgradeCategoriesChanged: onEquipUpgradeCategoriesChanged,
        onEquipUpgradeCategoryDeleted: onEquipUpgradeCategoryDeleted,
        createFromResponse: createFromResponse
    };

    function EquipUpgradeCategory(
        id,
        name,
        description,
        type)
    {
        this.id = id;
        this.name = name;
        this.description = description;
        this.type = type;

        Object.seal(this);
    }

    function getEquipUpgradeCategories() {
        if(!equipUpgradeCategoriesRequested) {
            loadEquipUpgradeCategories();
        } else {
            return equipUpgradeCategories;
        }
    }

    function createFromResponse(equipUpgradeCategory) {
        if (equipUpgradeCategory) {
            return new EquipUpgradeCategory(
                equipUpgradeCategory['id'],
                equipUpgradeCategory['name'],
                equipUpgradeCategory['description'],
                equipUpgradeCategory['type']
            );
        }
    }

    function onEquipUpgradeCategoriesChanged(callback) {
        onEquipUpgradeCategoriesChangedCallbacks.push(callback);
    }

    function onEquipUpgradeCategoryDeleted(callback) {
        onEquipUpgradeCategoryDeletedCallbacks.push(callback);
    }

    function notifyEquipUpgradeCategoriesChanged(equipUpgradeCategories) {
        onEquipUpgradeCategoriesChangedCallbacks.forEach(function(callback){
            callback(equipUpgradeCategories);
        });
    }

    function notifyEquipUpgradeCategoryDeleted(equipUpgradeCategory) {
        onEquipUpgradeCategoryDeletedCallbacks.forEach(function(callback){
            callback(equipUpgradeCategory);
        });
    }

    function loadEquipUpgradeCategories() {
        equipUpgradeCategoriesRequested = true;
        var url = Routing.generate('get_equip_upgrade_categories');
        return $http
            .get(url)
            .then(function(response){
                equipUpgradeCategories = response.data.map(function(equipUpgradeCategory){
                    return createFromResponse(equipUpgradeCategory);
                });
                notifyEquipUpgradeCategoriesChanged(equipUpgradeCategories);
            })
    }

    function addEquipUpgradeCategory(equipUpgradeCategory) {
        var url = Routing.generate('add_equip_upgrade_category');
        return $http.post(url, equipUpgradeCategory)
            .then(function(response){
                equipUpgradeCategories.push(response.data);
                notifyEquipUpgradeCategoriesChanged(equipUpgradeCategories);
                return response;
            });
    }

    function updateEquipUpgradeCategory(equipUpgradeCategory) {
        var url = Routing.generate('update_equip_upgrade_category', {id: equipUpgradeCategory.id});
        return $http.put(url, equipUpgradeCategory)
            .then(function(response){
                var index = equipUpgradeCategories.indexOf($filter('byId')(equipUpgradeCategories, equipUpgradeCategory.id));
                equipUpgradeCategories.splice(index, 1, response.data);
                notifyEquipUpgradeCategoriesChanged(equipUpgradeCategories);
                return response;
            });
    }

    function deleteEquipUpgradeCategory(equipUpgradeCategory) {
        var url = Routing.generate('delete_equip_upgrade_category', {id: equipUpgradeCategory.id});
        return $http.delete(url)
            .then(function(response){
                var index = equipUpgradeCategories.indexOf($filter('byId')(equipUpgradeCategories, equipUpgradeCategory.id));
                equipUpgradeCategories.splice(index, 1);
                notifyEquipUpgradeCategoriesChanged(equipUpgradeCategories);
                notifyEquipUpgradeCategoryDeleted(equipUpgradeCategory);
                return response;
            });
    }
}