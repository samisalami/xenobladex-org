'use strict';

angular.module('app')
    .directive('mapMarkerInput',['attachmentService', '$filter',function(attachmentService, $filter) {
        return {
            restrict: 'E',
            templateUrl:'templates/mapMarkerInputView.html',
            transclude: true,
            replace: true,
            scope: {
            },
            link: function($scope, element, attrs) {
                $scope.contentId = 'map-marker-input-'+Date.now();
            }
        }
    }]);