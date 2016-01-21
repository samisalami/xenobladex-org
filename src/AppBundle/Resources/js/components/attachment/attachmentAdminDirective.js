'use strict';

angular.module('app')
    .directive('attachmentAdmin', ['attachmentService',function(attachmentService) {
        return {
            restrict: 'E',
            templateUrl:'js/components/attachment/attachmentAdminView.html',
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

                resetNewAttachment();

                attachmentService.getAttachments(function(attachments){
                    $scope.attachments = attachments;
                });

                $scope.$watch('file', function(){
                    if ($scope.file) {
                        attachmentService.addAttachmentFile($scope.file, function(newAttachment){
                            $scope.attachments.push(newAttachment);
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