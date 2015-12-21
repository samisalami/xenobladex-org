'use strict';

angular.module('app')
    .factory('mapService', ['$http', function($http) {
        var service = {};

        service.getMaps = function(callback) {
            $http.get(Routing.generate('get_maps')).success(function(response){
                callback(response);
            });
        };

        service.addMap = function(map, callback) {
            $http.post(Routing.generate('add_map'), map).success(function(response){
                callback(response);
            });
        };

        service.updateMap = function(map) {
            $http.post(Routing.generate('update_map'), map);
        };

        service.deleteMap = function(id, callback) {
            $http.delete(Routing.generate('delete_map')+'/'+id).success(function(response){
                callback(response);
            });
        };

        return service;
    }]);