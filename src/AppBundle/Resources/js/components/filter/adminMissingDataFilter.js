'use strict';

angular.module('app')
    .filter('missingData', function(){
        return function(arr) {
            var missingDataArray = [];
            var count = arr.length;
            for (var i=0; i < count; i++) {
                var elm = arr[i];
                var missingDataElm = [];

                for (var property in elm) {
                    if (elm.hasOwnProperty(property)) {
                        if(property == 'name') {
                            missingDataElm[property] = elm[property];
                        } else {
                            if(Array.isArray(elm[property])) {
                                missingDataElm[property] = elm[property].length>0;
                            } else {
                                missingDataElm[property] = !!elm[property];
                            }
                        }
                    }
                }

                missingDataArray.push(missingDataElm);
            }

            return missingDataArray;
        }
    });