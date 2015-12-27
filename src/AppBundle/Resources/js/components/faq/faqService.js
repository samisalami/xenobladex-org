'use strict';

angular.module('app')
    .factory('faqService', ['$http', '$timeout', function($http, $timeout) {
        var service = {};

        service.getFAQs = function(callback) {
            $http.get(Routing.generate('get_faqs')).success(function(response){
                callback(response);
            });
        };

        service.addFAQ = function(faq, callback) {
            $http.post(Routing.generate('add_faq'), faq).success(function(){
                callback();
            });
        };

        service.updateFAQ = function(faq) {
            var promise = $timeout(function() {
                $http.post(Routing.generate('update_faq'), faq);
                $timeout.cancel(promise);
            }, 100);
        };

        service.deleteFAQ = function(id, callback) {
            $http.delete(Routing.generate('delete_faq')+'/'+id).success(function(response){
                callback(response);
            });
        };

        return service;
    }]);