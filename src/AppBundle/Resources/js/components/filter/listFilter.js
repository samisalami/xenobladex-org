'use strict';

angular.module('app')
    .filter('listFilter', function(){
        return function (list,filterValue,fieldname,childFieldname,returnEmpyList) {
            var result = [];
            if(!returnEmpyList && !filterValue) {
                return list.slice();
            } else {
                if(list && filterValue) {
                    var item;
                    var filterList = list.slice();
                    while (item = filterList.shift()) {
                        var listValue = item;
                        if(typeof fieldname !== 'undefined') {
                            listValue = item[fieldname];
                        }
                        if(listValue) {
                            if(childFieldname) {
                                if(listValue[childFieldname] == filterValue) {
                                    result.push(item);
                                }
                            } else {
                                if (String(listValue).toLowerCase().indexOf(String(filterValue).toLowerCase())!== -1) {
                                    result.push(item);
                                }
                            }
                        }
                    }
                    return result;
                }
            }
        };
    });