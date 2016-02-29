'use strict';

angular.module('app')
    .directive('multiField',['$filter','$parse',function($filter, $parse) {
        return {
            restrict: 'E',
            link: function($scope, element, attrs) {
                $scope.newItem = null;

                $scope.multiFieldAdd = function(){
                    if($scope.newItem) {
                        $scope.formFieldBind.push($scope.newItem);
                        $scope.newItem = null;
                    }
                };

                $scope.multiFieldDelete = function(id){
                    var item = $filter('byId')($scope.formFieldBind, id);
                    var index = $scope.formFieldBind.indexOf(item);
                    if(index !== -1) {
                        $scope.formFieldBind.splice(index,1);
                    }
                };

            }
        }
    }]);