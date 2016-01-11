'use strict';

angular.module('app')
    .filter('listFilter', function(){
        return function (list, filterValue,fieldname,childFieldname) {
            if(list && filterValue) {
                var result = [];
                var count = list.length;
                for (var i=0; i<count; i++) {
                    var listValue = list[i];
                    if(typeof fieldname !== 'undefined') {
                        listValue = list[i][fieldname];
                    }

                    if(listValue) {
                        if(childFieldname) {
                            if(listValue[childFieldname] == filterValue) {
                                result.push(list[i]);
                            }
                        } else {
                            if (listValue.toLowerCase().indexOf(filterValue.toLowerCase())!== -1) {
                                result.push(list[i]);
                            }
                        }

                    }
                }
                return result;
            } else {
                return list;
            }
        };
    });