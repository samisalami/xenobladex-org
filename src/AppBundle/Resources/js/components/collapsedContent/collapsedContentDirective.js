'use strict';

angular.module('app')
    .directive('collapsedContent',['$filter',function($filter) {
        return {
            restrict: 'EA',
            link: function($scope) {
                var visibleElements = [];

                $scope.visible = function(id) {
                    if(angular.element(id).hasClass('in')) {
                        var index = visibleElements.indexOf(id);
                        if(index !== -1) {
                            visibleElements.splice(index,1);
                        }
                    } else {
                        if(visibleElements.indexOf(id) == -1) {
                            visibleElements.push(id);
                        }
                    }
                };

                $scope.isVisible = function(id) {
                    return visibleElements.indexOf(id) != -1;
                };
            }
        }
    }]);