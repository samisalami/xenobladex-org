'use strict';

angular.module('app')
    .factory('attachmentService', ['$http', function($http) {
        var service = {};

        service.getAttachments = function(callback) {
            $http.get(Routing.generate('get_attachments')).success(function(response){
                callback(response);
            });
        };

        service.addAttachmentFile = function(file, callback) {
            var fd = new FormData();
            fd.append('file', file);
            $http.post(Routing.generate('add_attachment'), fd, {
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
            $http.post(Routing.generate('update_attachment'), attachment);
        };

        service.deleteAttachment = function(id, callback) {
            $http.delete(Routing.generate('delete_attachment')+'/'+id).success(function(){
                callback();
            });
        };

        return service;
    }]);