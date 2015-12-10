'use strict';

angular.module('app')
    .factory('XCXMissionService', XCXMissionService);

XCXMissionService.$inject = ['$http'];
function XCXMissionService($http) {
    var service = {};

    service.getMissions = function() {

    };

    return service;
}