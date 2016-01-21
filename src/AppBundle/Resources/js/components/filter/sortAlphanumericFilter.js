'use strict';

angular.module('app')
    .filter('sortAlphaNumeric', function(){
        return function (list, value) {
            return list.slice().sort(function(a,b){
                return alphanumCase(a[value], b[value]);
            });
        };
    });