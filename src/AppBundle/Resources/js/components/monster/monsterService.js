'use strict';

angular.module('app')
    .factory('monsterService', ['$http', '$timeout', function($http, $timeout) {
        var service = {};

        service.getMonsterTypes = function(callback) {
            $http.get(Routing.generate('get_monster_types')).success(function(response){
                callback(response);
            });
        };

        service.addMonsterType = function(monsterType, callback) {
            $http.post(Routing.generate('add_monster_type'), monsterType).success(function(){
                callback();
            });
        };

        service.updateMonsterType = function(monsterType) {
            var promise = $timeout(function() {
                $http.post(Routing.generate('update_monster_type'), monsterType);
                $timeout.cancel(promise);
            }, 100);
        };

        service.deleteMonsterType = function(id, callback) {
            $http.delete(Routing.generate('delete_monster_type')+'/'+id).success(function(response){
                callback(response);
            });
        };

        return service;
    }]);