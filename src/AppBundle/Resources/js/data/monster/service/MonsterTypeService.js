'use strict';

angular.module('app')
    .factory('MonsterTypeService', MonsterTypeService);

    MonsterTypeService.$inject = ['$http', '$filter'];

    function MonsterTypeService($http, $filter) {
        var onMonsterTypesChangedCallbacks = [];
        var onMonsterTypeDeletedCallbacks = [];
        var monsterTypes = null;
        var monsterTypesRequested = false;

        return {
            MonsterType: MonsterType,
            getMonsterTypes: getMonsterTypes,
            loadMonsterTypes: loadMonsterTypes,
            addMonsterType: addMonsterType,
            updateMonsterType: updateMonsterType,
            deleteMonsterType: deleteMonsterType,
            onMonsterTypesChanged: onMonsterTypesChanged,
            onMonsterTypeDeleted: onMonsterTypeDeleted
        };

        function MonsterType(
            id,
            name,
            description,
            prio,
            materials)
        {
            this.id = id;
            this.name = name;
            this.description = description;
            this.prio = prio;
            this.materials = materials;

            Object.seal(this);
        }

        function getMonsterTypes() {
            if(!monsterTypesRequested) {
                loadMonsterTypes();
            } else {
                return monsterTypes;
            }
        }

        function createFromResponse(monsterType) {
            if (monsterType) {
                return new MonsterType(
                    monsterType['id'],
                    monsterType['name'],
                    monsterType['description'],
                    monsterType['prio'],
                    monsterType['materials']
                );
            }
        }

        function onMonsterTypesChanged(callback) {
            onMonsterTypesChangedCallbacks.push(callback);
        }

        function onMonsterTypeDeleted(callback) {
            onMonsterTypeDeletedCallbacks.push(callback);
        }

        function notifyMonsterTypesChanged(monsterTypes) {
            onMonsterTypesChangedCallbacks.forEach(function(callback){
               callback(monsterTypes);
            });
        }

        function notifyMonsterTypeDeleted(monsterType) {
            onMonsterTypeDeletedCallbacks.forEach(function(callback){
                callback(monsterType);
            });
        }

        function loadMonsterTypes() {
            monsterTypesRequested = true;
            var url = Routing.generate('get_monster_types');
            return $http
                .get(url)
                .then(function(response){
                    monsterTypes = response.data.map(function(monsterType){
                        return createFromResponse(monsterType);
                    });
                    notifyMonsterTypesChanged(monsterTypes);
                })
        }

        function addMonsterType(monsterType) {
            var url = Routing.generate('add_monster_type');
            return $http.post(url, monsterType)
                .then(function(response){
                    monsterTypes.push(response.data);
                    notifyMonsterTypesChanged(monsterTypes);
                    return response;
                });
        }

        function updateMonsterType(monsterType) {
            var url = Routing.generate('update_monster_type', {id: monsterType.id});
            return $http.put(url, monsterType)
                .then(function(response){
                    notifyMonsterTypesChanged(monsterTypes);
                    return response;
                  });
        }

        function deleteMonsterType(monsterType) {
            var url = Routing.generate('delete_monster_type', {id: monsterType.id});
            return $http.delete(url)
                .then(function(response){
                    var index = monsterTypes.indexOf($filter('byId')(monsterTypes, monsterType.id));
                    monsterTypes.splice(index, 1);
                    notifyMonsterTypesChanged(monsterTypes);
                    notifyMonsterTypeDeleted(monsterType);
                    return response;
                });
        }
    }