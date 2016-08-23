'use strict';

angular.module('app')
    .factory('MonsterService', MonsterService);

MonsterService.$inject = ['$http', '$filter'];

function MonsterService($http, $filter) {
    var onMonstersChangedCallbacks = [];
    var onMonsterDeletedCallbacks = [];
    var monsters = null;
    var monstersRequested = false;

    return {
        Monster: Monster,
        getMonsters: getMonsters,
        loadMonsters: loadMonsters,
        addMonster: addMonster,
        updateMonster: updateMonster,
        deleteMonster: deleteMonster,
        onMonstersChanged: onMonstersChanged,
        onMonsterDeleted: onMonsterDeleted
    };

    function Monster(
        id,
        name,
        description,
        location_note,
        level_min,
        level_max,
        time,
        weather,
        monster_type,
        monster_type_prio,
        is_unique,
        is_story,
        ep,
        hp,
        res_physic,
        res_laser,
        res_ether,
        res_electric,
        res_gravit,
        region,
        res_thermo,
        materials,
        map_geo_json
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.location_note = location_note;
        this.level_min = level_min;
        this.level_max = level_max;
        this.time = time;
        this.weather = weather;
        this.monster_type = monster_type;
        this.monster_type_prio = monster_type_prio;
        this.is_unique = is_unique;
        this.is_story = is_story;
        this.ep = ep;
        this.hp = hp;
        this.res_physic = res_physic;
        this.res_laser = res_laser;
        this.res_ether = res_ether;
        this.res_electric = res_electric;
        this.res_gravit = res_gravit;
        this.region = region;
        this.res_thermo = res_thermo;
        this.materials = materials;
        this.map_geo_json = map_geo_json;

        Object.seal(this);
    }

    function getMonsters() {
        if(!monstersRequested) {
            loadMonsters();
        } else {
            return monsters;
        }
    }

    function createFromResponse(monster) {
        if (monster) {
            return new Monster(
                monster['id'],
                monster['name'],
                monster['description'],
                monster['location_note'],
                monster['level_min'],
                monster['level_max'],
                monster['time'],
                monster['weather'],
                monster['monster_type'],
                monster['monster_type_prio'],
                monster['is_unique'],
                monster['is_story'],
                monster['ep'],
                monster['hp'],
                monster['res_physic'],
                monster['res_laser'],
                monster['res_ether'],
                monster['res_electric'],
                monster['res_gravit'],
                monster['region'],
                monster['res_thermo'],
                monster['materials'],
                monster['map_geo_json']
            );
        }
    }

    function onMonstersChanged(callback) {
        onMonstersChangedCallbacks.push(callback);
    }

    function onMonsterDeleted(callback) {
        onMonsterDeletedCallbacks.push(callback);
    }

    function notifyMonstersChanged(monsters) {
        onMonstersChangedCallbacks.forEach(function(callback){
            callback(monsters);
        });
    }

    function notifyMonsterDeleted(monster) {
        onMonsterDeletedCallbacks.forEach(function(callback){
            callback(monster);
        });
    }

    function loadMonsters() {
        monstersRequested = true;
        var url = Routing.generate('get_monsters');
        return $http
            .get(url)
            .then(function(response){
                monsters = response.data.map(function(monster){
                    return createFromResponse(monster);
                });
                notifyMonstersChanged(monsters);
            })
    }

    function addMonster(monster) {
        var url = Routing.generate('add_monster');
        return $http.post(url, monster)
            .then(function(response){
                monsters.push(response.data);
                notifyMonstersChanged(monsters);
                return response;
            });
    }

    function updateMonster(monster) {
        var url = Routing.generate('update_monster', {id: monster.id});
        return $http.put(url, monster)
            .then(function(response){
                var index = monsters.indexOf($filter('byId')(monsters, monster.id));
                monsters.splice(index, 1, response.data);
                notifyMonstersChanged(monsters);
                return response;
            });
    }

    function deleteMonster(monster) {
        var url = Routing.generate('delete_monster', {id: monster.id});
        return $http.delete(url)
            .then(function(response){
                var index = monsters.indexOf($filter('byId')(monsters, monster.id));
                monsters.splice(index, 1);
                notifyMonstersChanged(monsters);
                notifyMonsterDeleted(monster);
                return response;
            });
    }
}