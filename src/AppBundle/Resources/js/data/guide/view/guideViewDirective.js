'use strict';

angular.module('app')
    .directive('guideView',['GuideService', '$filter', '$sce', '$compile', '$anchorScroll', '$timeout', function(GuideService, $filter, $sce, $compile, $anchorScroll, $timeout) {
        return {
            restrict: 'EA',
            controller: ['$scope',function($scope){
                $scope.guide = $scope.guideById;

                $scope.guideContent = $sce.trustAsHtml($scope.guide.copy);
            }]
        }
    }]);