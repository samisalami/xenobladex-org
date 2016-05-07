'use strict';

angular.module('app')
    .directive('scrollTo', function() {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var scrollTop;

                $(element).on('click', function(e){
                    e.preventDefault();
                    var dest = attrs.scrollTo;

                    if($(dest).length > 0) {
                        scrollTop = $(dest).offset().top;
                    } else {
                        scrollTop = dest;
                    }

                    $('html, body').scrollTop(dest);
                });
            }
        }
    });