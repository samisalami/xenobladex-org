'use strict';

angular.module('app')
    .directive('attachmentAdmin', ['attachmentService',function(attachmentService) {
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
                    attachmentService.getAttachments(function(attachments){
                        $scope.attachments = attachments;
                    });
                };

                resetNewAttachment();
                getAttachments();


                $scope.$watch('file', function(){
                    if ($scope.file) {
                        attachmentService.addAttachmentFile($scope.file, function(){
                            getAttachments();
                            resetNewAttachment();
                        });
                    }
                });

                $scope.updateAttachment = function(attachment) {
                    attachmentService.updateAttachment(attachment);
                };

                $scope.deleteAttachment = function(attachment) {
                    attachmentService.deleteAttachment(attachment.id, function(){
                        var index = $scope.attachments.indexOf(attachment);
                        if(index !== -1) {
                            $scope.attachments.splice(index,1);
                        }
                    });
                };
            }
        }
    }]);