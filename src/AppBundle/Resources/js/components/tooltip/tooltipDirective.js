'use strict';

angular.module('app')
.directive('bsTooltip', function() {
    return {
        link: function($scope, elm) {
            elm.tooltip();
        }
    }
});