'use strict';

angular.module('app')
    .directive('collapsedTableList',['$filter',function($filter) {
        return {
            restrict: 'EA',
            replace: true,
            transclude: true,
            templateUrl: 'js/components/form/collapsedTable/collapsedTableListView.html',
            scope: true,
            link: function($scope, $element, attrs) {
                $scope.tableListLabel = attrs.tableListLabel;
                $scope.addForm = attrs.addForm;
                $scope.idPrefix = attrs.idPrefix || '';
            }
        }
    }]);