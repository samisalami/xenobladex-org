'use strict';

angular.module('app')
    .directive('attachmentInput',['attachmentService', '$filter',function(attachmentService, $filter) {
        return {
            restrict: 'EA',
            templateUrl:'templates/attachmentInputView.html',
            transclude: true,
            replace: true,
            scope: {
                attachmentBind: '=',
                attachmentList: '='
            },
            link: function($scope, element, attrs) {
                var attachmentType = attrs.attachmentType;
                var contentId = $('.attachment-input-view').length;
                $scope.selectModalId = 'attachment-select-modal-'+contentId;

                if(typeof (attachmentType) !== 'undefined') {
                    $scope.attachments = $filter('filter')($scope.attachmentList, {mime_type:attachmentType});
                } else {
                    $scope.attachments = $scope.attachmentList;
                }

                $scope.selectOption = function(attachment) {
                    $scope.attachmentBind = attachment;
                    element.find('#'+$scope.selectModalId).modal('hide');
                }
            }
        }
    }]);