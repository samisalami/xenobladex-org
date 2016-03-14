'use strict';

angular.module('app')
    .directive('collapsedTableList',['$filter',function($filter) {
        return {
            restrict: 'EA',
            replace: true,
            transclude: true,
            templateUrl: 'js/components/form/collapsedTable/collapsedTableListView.html',
            link: function($scope, $element, attrs) {
                $scope.tableListLabel = attrs.tableListLabel;
                $scope.visibleElements = [];

                if(attrs.addForm) {
                    $scope.addForm = true;
                } else {
                    $scope.addForm = false;
                }

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