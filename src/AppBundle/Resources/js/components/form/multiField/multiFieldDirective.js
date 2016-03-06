'use strict';

angular.module('app')
    .directive('multiField',['$filter','$parse',function($filter, $parse) {
        return {
            restrict: 'E',
            link: function($scope, element, attrs) {
                $scope.newItem = null;

                $scope.multiFieldAdd = function(){
                    if($scope.newItem) {
                        var add = true;
                        if($scope.newItem.id) {
                            var count = $scope.formFieldBind.length;
                            for(var i=0;i<count;i++) {
                                var material = $scope.formFieldBind[i];
                                if(material.id == $scope.newItem.id) {
                                    add = false;
                                    break;
                                }
                            }
                        }

                        if(add) {
                            $scope.formFieldBind.push($scope.newItem);
                        }

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