'use strict';

angular.module('app')
    .filter('listFilter', function(){
        return function (list,filterValue,fieldname,childFieldname,returnEmpyList) {
            var result = [];
            if(!returnEmpyList && !filterValue) {
                if(Array.isArray(list)) {
                    return list.slice();
                } else {
                    return list;
                }
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
                                var canonicalFilterValue = String(filterValue).toLowerCase();
                                if(Array.isArray(listValue)) {
                                    var subArrayCount = listValue.length;
                                    for(var i=0; i<subArrayCount; i++) {
                                        var subItem = listValue[i];
                                        if(String(subItem[childFieldname]).toLowerCase().indexOf(canonicalFilterValue) !== -1 ) {
                                            result.push(item);
                                            break;
                                        }
                                    }
                                } else {
                                    if(listValue[childFieldname]) {
                                        if(String(listValue[childFieldname]).toLowerCase().indexOf(canonicalFilterValue) !== -1) {
                                            result.push(item);
                                        }
                                    }
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