'use strict';

angular.module('app')
    .directive('bindAutocompleteAsId',['$filter', function($filter) {
        return {
            restrict: 'E',
            scope: {
                bindItem: "=",
                options: "="
            },
            controller: ['$scope',function($scope) {
                $scope.item = $scope.bindItem ? $.extend({},$filter('byId')($scope.options, $scope.bindItem),true) : {};

                $scope.updateAutocompleteItem = function() {
                    if($scope.item.id) {
                        $scope.bindItem = $scope.item.id
                    }
                }
            }],
            controllerAs: 'autocomplete'
        }
    }]);