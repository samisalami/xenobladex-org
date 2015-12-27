'use strict';

angular.module('app')
    .factory('missionService', ['$http', '$timeout', function($http, $timeout) {
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
        $http.post(Routing.generate('add_mission'), mission).success(function(){
            callback();
        });
    };

    service.updateMission = function(mission) {
        var promise = $timeout(function() {
            $http.post(Routing.generate('update_mission'), mission);
            $timeout.cancel(promise);
        }, 100);
    };

    service.deleteMission = function(id, callback) {
        $http.delete(Routing.generate('delete_mission')+'/'+id).success(function(response){
            callback(response);
        });
    };

    return service;
}]);