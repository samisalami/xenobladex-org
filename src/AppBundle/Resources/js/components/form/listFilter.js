'use strict';

angular.module('app')
    .filter('listFilter', function(){
        return function (list, filterValue,fieldname) {
            if(list && filterValue) {
                var result = [];
                var count = list.length;
                for (var i=0; i<count; i++) {
                    var listValue = list[i];
                    if(typeof fieldname !== 'undefined') {
                        listValue = list[i][fieldname];
                    }

                    if (listValue.indexOf(filterValue)!== -1) {
                        result.push(list[i]);
                    }
                }
                return result;
            } else {
                return list;
            }
        };
    });