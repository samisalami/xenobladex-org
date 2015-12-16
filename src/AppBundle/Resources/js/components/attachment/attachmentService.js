'use strict';

angular.module('app')
    .factory('attachmentService', ['$http', function($http) {
        var service = {};

        service.getAttachments = function(callback) {
            $http.get('/xenobladex/api/attachments').success(function(response){
                callback(response);
            });
        };

        service.addAttachmentFile = function(file, callback) {
            var fd = new FormData();
            fd.append('file', file);
            $http.post('/xenobladex/api/attachment/add', fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
            .success(function(newAttachment){
                callback(newAttachment);
            })
            .error(function(){
                return false;
            });
        };

        service.updateAttachment = function(attachment) {
            $http.post('/xenobladex/api/attachment/update', attachment);
        };

        service.deleteAttachment = function(id, callback) {
            $http.delete('/xenobladex/api/attachments/'+id).success(function(){
                callback();
            });
        };

        return service;
    }]);