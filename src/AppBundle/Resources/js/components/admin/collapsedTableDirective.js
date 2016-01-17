'use strict';

angular.module('app')
    .directive('collapsedTable',['$filter',function($filter) {
        return {
            restrict: 'E',
            templateUrl: 'templates/collapsedTableView.html',
            scope: {
                data: "=viewData",
                newItem: '=addObject',
                formModel: '=',
                deleteItem: '&',
                updateItem: '&',
                addItem: '&',
                modalFilterValue: '='
            },
            link: function($scope, element, attrs) {
                $scope.columns = $scope.formModel.fields;
            }
        }
    }]);