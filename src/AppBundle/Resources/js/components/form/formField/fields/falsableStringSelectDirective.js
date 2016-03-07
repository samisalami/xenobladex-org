'use strict';

angular.module('app')
    .directive('falsableStringSelect',['$filter','$parse',function($filter, $parse) {
        return {
            restrict: 'E',
            link: function($scope, element, attrs) {
                var prefix = attrs.falsableCheckboxPrefix;
                var setFalsableStringSelect = function() {
                    if($scope.$parent.formFieldBind) {
                        $scope.selectValue = $scope.$parent.formFieldBind.replace(prefix+' ', '');
                        $scope.checkboxValue = $scope.$parent.formFieldBind.indexOf(prefix) !== -1;
                    }
                };

                setFalsableStringSelect();

                $scope.setModel = function() {
                    if($scope.selectValue) {
                        if($scope.checkboxValue) {
                            $scope.$parent.formFieldBind = prefix+' '+$scope.selectValue;
                        } else {
                            $scope.$parent.formFieldBind = $scope.selectValue;
                        }
                    }
                };

            }
        }
    }]);