'use strict';

angular.module('app')
    .directive('falsableStringSelect',['$filter','$parse',function($filter, $parse) {
        return {
            restrict: 'E',
            link: function($scope, element, attrs) {
                var prefix = attrs.falsableCheckboxPrefix;

                if($scope.$parent.formFieldBind) {
                    $scope.selectValue = $scope.$parent.formFieldBind.replace(prefix, '').replace(/\s+/g, '');
                    if($scope.$parent.formFieldBind.indexOf(prefix)!== -1) {
                        $scope.checkboxValue = true;
                    } else {
                        $scope.checkboxValue = false;
                    }
                }

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