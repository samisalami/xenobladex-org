'use strict';

angular.module('app')
.directive('bsTooltip', function() {
    return {
        scope: {
            bsTooltipTitle: '@'
        },
        link: function($scope, elm) {
            elm.tooltip({
                title: $scope.bsTooltipTitle
            });
        }
    }
});