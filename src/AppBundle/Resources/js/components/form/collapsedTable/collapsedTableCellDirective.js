'use strict';

angular.module('app')
    .directive('collapsedTableCell',['$filter',function($filter) {
        return {
            restrict: 'EA',
            transclude: true,
            replace: true,
            templateUrl: 'js/components/form/collapsedTable/collapsedTableCellView.html'
        }
    }]);