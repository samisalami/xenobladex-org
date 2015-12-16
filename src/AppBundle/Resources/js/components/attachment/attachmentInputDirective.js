'use strict';

angular.module('app')
    .directive('attachmentInput',['attachmentService',function(attachmentService) {
        return {
            restrict: 'E',
            templateUrl:'templates/attachmentInputView.html',
            replace: true,
            scope: {
              $data: '='
            },
            link: function($scope) {
                attachmentService.getAttachments(function(attachments){
                    $scope.attachments = attachments;
                });
            }
        }
    }]);