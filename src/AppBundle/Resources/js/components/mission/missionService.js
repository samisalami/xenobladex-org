'use strict';

angular.module('app')
    .factory('missionService', ['$http', function($http) {
    var service = {};

    service.getMissionTypes = function(callback) {
        $http.get(Routing.generate('get_missions_types')).success(function(response){
            callback(response);
        });
    };

    service.getMissions = function(callback) {
        $http.get(Routing.generate('get_missions')).success(function(response){
            callback(response);
        });
    };

    service.addMission = function(mission, callback) {
        $http.post(Routing.generate('add_mission'), mission).success(function(response){
            callback(response);
        });
    };

    service.updateMission = function(mission) {
        $http.post(Routing.generate('update_mission'), mission);
    };

    service.deleteMission = function(id, callback) {
        $http.delete(Routing.generate('delete_mission')+'/'+id).success(function(response){
            callback(response);
        });
    };

    return service;
}]);