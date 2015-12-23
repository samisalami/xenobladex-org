'use strict';

angular.module('app')
    .factory('personService', ['$http', function($http) {
        var service = {};

        service.getPersons = function(callback) {
            $http.get(Routing.generate('get_persons')).success(function(response){
                callback(response);
            });
        };

        service.addPerson = function(person, callback) {
            $http.post(Routing.generate('add_person'), person).success(function(){
                callback();
            });
        };

        service.updatePerson = function(person) {
            $http.post(Routing.generate('update_person'), person);
        };

        service.deletePerson = function(id, callback) {
            $http.delete(Routing.generate('delete_person')+'/'+id).success(function(response){
                callback(response);
            });
        };

        return service;
    }]);