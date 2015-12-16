'use strict';

angular.module('app')
    .factory('missionService', ['$http', function($http) {
    var service = {};

    service.getMissionTypes = function(callback) {
        $http.get('/xenobladex/api/missions/types').success(function(response){
            callback(response);
        });
    };

    service.getMissions = function(callback) {
        $http.get('/xenobladex/api/missions').success(function(response){
            callback(response);
        });
    };

    service.addMission = function(mission, callback) {
        $http.post('/xenobladex/api/mission/add', mission).success(function(response){
            callback(response);
        });
    };

    service.updateMission = function(mission) {
        $http.post('/xenobladex/api/mission/update', mission);
    };

    service.deleteMission = function(id, callback) {
        $http.delete('/xenobladex/api/missions/'+id).success(function(response){
            callback(response);
        });
    };

    return service;
}]);