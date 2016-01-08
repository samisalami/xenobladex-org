'use strict';

angular.module('app')
    .directive('missionView',['missionService','$filter', function(missionService, $filter) {
        return {
            restrict: 'E',
            link: function($scope, $element,$attrs){
                var groupBy = function(arr, groupBy) {
                    var groupedData = new Array();
                    var count = arr.length;
                    for(var i=0;i<count;i++) {
                        var groupByValue = '';
                        if(arr[i][groupBy]) {
                            groupByValue = arr[i][groupBy]['name'];
                        }

                        var exists = false;
                        var gCount = groupedData.length;
                        for (var x=0; x<gCount; x++){
                            if(groupedData[x]['name']===groupByValue) {
                                exists = true;
                                groupedData[x]['missions'].push(arr[i]);
                                break;
                            }
                        }

                        if(!exists) {
                            var newArr = {};
                            newArr['name'] = groupByValue;
                            newArr['missions'] = new Array();
                            newArr['missions'].push(arr[i]);
                            groupedData.push(newArr);
                        }
                    }
                    return groupedData;
                };

                missionService.getMissions(function(response){
                    $scope.groupedMissions = groupBy(response,'mission_type');
                });
            }
        }
    }]);