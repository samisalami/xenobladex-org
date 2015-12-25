'use strict';

angular.module('app')
    .directive('collapsedTable',function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/collapsedTableView.html',
            scope: {
                data: "=viewData",
                formModel: '=',
                deleteItem: '&',
                updateItem: '&',
                addItem: '&'
            },
            link: function($scope, element, attrs) {
                var columnCount = 4;

                function chunk(arr, size) {
                    var newArr = [];
                    for (var i=0; i<arr.length; i+=size) {
                        newArr.push(arr.slice(i, i+size));
                    }
                    return newArr;
                }

                $scope.rows = chunk($scope.formModel, columnCount);

            }
        }
    });