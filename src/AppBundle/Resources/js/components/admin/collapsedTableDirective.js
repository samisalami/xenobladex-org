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
                var columnCount = 4;

                function dataToRows(arr, size) {
                    var newArr = [];
                    var rowArr = [];
                    var count = arr.length;
                    var rowColumns = 0;

                    for (var i=0;i<count;i++) {
                        if(rowColumns===columnCount) {
                            newArr.push(rowArr);
                            rowArr = [];
                            rowColumns = 0;
                        }

                        if(!arr[i]['noColumn']) {
                            rowColumns++;
                        }

                        rowArr.push(arr[i]);

                        if(i===count-1) {
                            newArr.push(rowArr);
                        }

                    }
                    return newArr;
                }

                $scope.rows = dataToRows($scope.formModel, columnCount);

            }
        }
    }]);