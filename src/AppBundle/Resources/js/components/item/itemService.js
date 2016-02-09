'use strict';

angular.module('app')
    .factory('itemService', ['$http', '$timeout', function($http, $timeout) {
        var service = {};

        service.getMaterials = function(callback) {
            $http.get(Routing.generate('get_materials')).success(function(response){
                callback(response);
            });
        };

        service.getMaterialsDetail = function(callback) {
            $http.get(Routing.generate('get_materials_detail')).success(function(response){
                callback(response);
            });
        };

        service.addMaterial = function(material, callback) {
            $http.post(Routing.generate('add_material'), material).success(function(){
                callback();
            });
        };

        service.updateMaterial = function(material) {
            var promise = $timeout(function() {
                $http.post(Routing.generate('update_material'), material);
                $timeout.cancel(promise);
            }, 100);
        };

        service.deleteMaterial = function(id, callback) {
            $http.delete(Routing.generate('delete_material')+'/'+id).success(function(response){
                callback(response);
            });
        };

        service.getCollectibles = function(callback) {
            $http.get(Routing.generate('get_collectibles')).success(function(response){
                callback(response);
            });
        };

        service.addCollectible = function(collectible, callback) {
            $http.post(Routing.generate('add_collectible'), collectible).success(function(){
                callback();
            });
        };

        service.updateCollectible = function(collectible) {
            var promise = $timeout(function() {
                $http.post(Routing.generate('update_collectible'), collectible);
                $timeout.cancel(promise);
            }, 100);
        };

        service.deleteCollectible = function(id, callback) {
            $http.delete(Routing.generate('delete_collectible')+'/'+id).success(function(response){
                callback(response);
            });
        };

        return service;
    }]);