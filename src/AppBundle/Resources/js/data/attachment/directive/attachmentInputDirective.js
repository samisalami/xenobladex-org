'use strict';

angular.module('app')
    .directive('attachmentInput',['attachmentService', '$filter',function(attachmentService, $filter) {
        return {
            restrict: 'EA',
            templateUrl:'js/data/attachment/view/attachmentInputView.html',
            transclude: true,
            replace: true,
            scope: {
                attachmentBind: '=',
                attachmentList: '='
            },
            link: function($scope, element, attrs) {
                var attachmentType = attrs.attachmentType;
                $scope.selectModalId = 'attachment-select-modal-'+Date.now();

                if(typeof (attachmentType) !== 'undefined') {
                    $scope.attachmentList = $filter('filter')($scope.attachmentList, {mime_type:attachmentType});
                }

                $scope.selectOption = function(attachment) {
                    $scope.attachmentBind = attachment;
                    element.find('#'+$scope.selectModalId).modal('hide');
                }
            }
        }
    }]);