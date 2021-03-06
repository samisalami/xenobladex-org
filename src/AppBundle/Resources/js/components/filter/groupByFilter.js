'use strict';

angular.module('app')
    .filter('groupByFilter', function(){
        return function (arr, groupBy, childEntity) {
            if(Array.isArray(arr) && arr.length > 0) {
                var groupedData = [];
                var count = arr.length;
                var isEntity = false;
                if(typeof childEntity !== 'undefined') {
                    isEntity = childEntity;
                }
                for(var i=0;i<count;i++) {
                    var groupByValue = '';
                    if(arr[i][groupBy]) {
                        if (isEntity) {
                            groupByValue = arr[i][groupBy]['name'];
                        } else {
                            groupByValue = arr[i][groupBy];
                        }
                    }

                    var exists = false;
                    var gCount = groupedData.length;
                    for (var x=0; x<gCount; x++){
                        if(groupedData[x]['name']===groupByValue) {
                            exists = true;
                            groupedData[x]['rows'].push(arr[i]);
                            break;
                        }
                    }

                    if(!exists) {
                        var newArr = {};
                        newArr['name'] = groupByValue;
                        newArr['rows'] = [];
                        newArr['rows'].push(arr[i]);
                        groupedData.push(newArr);
                    }
                }

                return groupedData;
            } else {
                return arr;
            }
        };
    });