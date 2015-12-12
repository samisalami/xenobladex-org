'use strict';

angular.module('app')
    .factory('missionService', ['$http', function($http) {
    var service = {};

    service.getMissions = function(callback) {
        $http.get('/xenobladex/api/missions').then(function(response){
            callback(response);
        });
    };

    service.addMission = function(mission, callback) {
        $http.post('/xenobladex/api/mission/add', mission).success(function(response){
            callback(response);
        });
    };

    return service;
}]);