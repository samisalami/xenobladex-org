'use strict';

angular.module('app')
    .factory('mapService', ['$http', function($http) {
        var service = {};

        service.getMaps = function(callback) {
            $http.get('/xenobladex/api/maps').success(function(response){
                callback(response);
            });
        };

        service.addMap = function(map, callback) {
            $http.post('/xenobladex/api/map/add', map).success(function(response){
                callback(response);
            });
        };

        service.updateMap = function(map) {
            $http.post('/xenobladex/api/map/update', map);
        };

        service.deleteMap = function(id, callback) {
            $http.delete('/xenobladex/api/maps/'+id).success(function(response){
                callback(response);
            });
        };

        return service;
    }]);