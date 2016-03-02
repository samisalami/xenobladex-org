'use strict';

angular.module('app')
    .filter('byId', function(){
        return function(input, id) {
            if(Array.isArray(input) && id) {
                var arr = input.slice();
                var i=0, len=arr.length;
                for (; i<len; i++) {
                    if (+arr[i].id == +id) {
                        return arr[i];
                    }
                }
                return null;
            } else {
                return null;
            }
        }
    });