'use strict';

angular.module('app')
    .directive('attachmentAdmin', ['AttachmentService',function(AttachmentService) {
        return {
            restrict: 'E',
            templateUrl:'js/data/attachment/view/attachmentAdminView.html',
            replace: true,
            link: function($scope) {
                var resetNewAttachment = function() {
                    $scope.file = null;
                    $scope.newAttachment = {
                        name: '',
                        description: '',
                        file_name: '',
                        mime_type: '',
                        uuid: ''
                    };
                };

                var getAttachments = function() {
                    AttachmentService.getAttachments(function(attachments){
                        $scope.attachments = attachments;
                    });
                };

                resetNewAttachment();
                getAttachments();


                $scope.$watch('file', function(){
                    if ($scope.file) {
                        AttachmentService.addAttachmentFile($scope.file, function(){
                            getAttachments();
                            resetNewAttachment();
                        });
                    }
                });

                $scope.updateAttachment = function(attachment) {
                    AttachmentService.updateAttachment(attachment);
                };

                $scope.deleteAttachment = function(attachment) {
                    AttachmentService.deleteAttachment(attachment.id, function(){
                        var index = $scope.attachments.indexOf(attachment);
                        if(index !== -1) {
                            $scope.attachments.splice(index,1);
                        }
                    });
                };
            }
        }
    }]);