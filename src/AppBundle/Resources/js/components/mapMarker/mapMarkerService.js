'use strict';

angular.module('app')
    .factory('mapmarkerService', ['$http', '$timeout', function($http, $timeout) {
        var service = {};

        service.getMapmarkers = function(callback) {
            $http.get(Routing.generate('get_mapmarkers')).success(function(response){
                callback(response);
            });
        };

        service.getMapmarkersByPerson = function(id, callback) {
            return $http.get(Routing.generate('get_mapmarkers_by_person')+'/'+id).success(function(response){
                callback(response);
            });
        };

        service.getMapmarkersByMap = function(id, callback) {
            return $http.get(Routing.generate('get_mapmarkers_by_map')+'/'+id).success(function(response){
                callback(response);
            });
        };

        service.addMapmarker = function(mapmarker, type, callback) {
            $http.post(Routing.generate('add_mapmarker', {type: type}), mapmarker).success(function(){
                callback();
            });
        };

        service.updateMapmarker = function(mapmarker) {
            $http.post(Routing.generate('update_mapmarker'), mapmarker);
        };

        service.deleteMapmarker = function(id, callback) {
            $http.delete(Routing.generate('delete_mapmarker')+'/'+id).success(function(response){
                callback(response);
            });
        };

        return service;
    }]);