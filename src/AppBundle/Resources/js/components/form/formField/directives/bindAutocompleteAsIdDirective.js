'use strict';

angular.module('app')
    .directive('bindAutocompleteAsId',['$filter', function($filter) {
        return {
            restrict: 'E',
            scope: {
                bindItem: "=",
                options: "="
            },
            templateUrl: 'js/components/form/formField/directives/bindAutocompleteAsIdView.html',
            controller: ['$scope',function($scope) {
                $scope.item = $scope.bindItem ? $.extend({},$filter('byId')($scope.options, $scope.bindItem),true) : {};

                $scope.updateAutocompleteItem = function() {
                    $scope.$apply(function(){
                        if($scope.item.id) {
                            $scope.bindItem = $scope.item.id;
                        } else {
                            $scope.bindItem = null;
                        }
                    });
                }
            }],
            controllerAs: 'autocomplete'
        }
    }]);