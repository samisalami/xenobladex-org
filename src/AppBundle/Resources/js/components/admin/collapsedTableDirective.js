'use strict';

angular.module('app')
    .directive('collapsedTable',['$filter',function($filter) {
        return {
            restrict: 'E',
            templateUrl: 'js/components/admin/collapsedTableView.html',
            scope: {
                data: "=viewData",
                newItem: '=addObject',
                formModel: '=',
                deleteItem: '&',
                updateItem: '&',
                addItem: '&',
                modalFilterValue: '='
            },
            link: function($scope, $element, attrs) {
                $scope.visibleElements = [];
                $scope.columns = $scope.formModel.fields;

                $scope.visible = function(item, $event) {
                    var id = angular.element($event.target).data('target');
                    if(angular.element(id).hasClass('in')) {
                        var index = $scope.visibleElements.indexOf(item);
                        if(index !== -1) {
                            $scope.visibleElements.splice(index,1);
                        }
                    } else {
                        if($scope.visibleElements.indexOf(item) == -1) {
                            $scope.visibleElements.push(item);
                        }
                    }
                }
            }
        }
    }]);