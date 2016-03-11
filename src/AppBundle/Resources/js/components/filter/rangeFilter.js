'use strict';

angular.module('app')
    .filter('range', function(){
        return function(input, value, minField, maxField) {
            if(Array.isArray(input) && value) {
                var result = [];
                var arr = input.slice();
                var i=0, len=arr.length;
                for (; i<len; i++) {
                    //console.log(arr[i][minField]);
                    //console.log(arr[i][maxField]);
                    if(!arr[i][maxField]) {
                        if(value == arr[i][minField]) {
                            result.push(arr[i]);
                        }
                    } else {
                        if (value >= arr[i][minField] && value <= arr[i][maxField]) {
                            result.push(arr[i]);
                        }
                    }
                }
                return result;
            } else {
                return input;
            }
        }
    });