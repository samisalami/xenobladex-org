'use strict';

angular.module('app')
    .factory('monsterService', ['$http', '$timeout', function($http, $timeout) {
        var service = {};

        service.getMonsters = function(callback) {
            $http.get(Routing.generate('get_monsters')).success(function(response){
                callback(response);
            });
        };

        service.getMonstersDetail = function(callback) {
            $http.get(Routing.generate('get_monsters_detail')).success(function(response){
                callback(response);
            });
        };

        service.addMonster = function(monsterType, callback) {
            $http.post(Routing.generate('add_monster'), monsterType).success(function(){
                callback();
            });
        };

        service.updateMonster = function(monsterType) {
            var promise = $timeout(function() {
                $http.post(Routing.generate('update_monster'), monsterType);
                $timeout.cancel(promise);
            }, 100);
        };

        service.deleteMonster = function(id, callback) {
            $http.delete(Routing.generate('delete_monster')+'/'+id).success(function(response){
                callback(response);
            });
        };

        service.getMonsterTypes = function(callback,context) {
            if(!context) {
                context = "default";
            }
            $http.get(Routing.generate('get_monster_types', {context: context})).success(function(response){
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