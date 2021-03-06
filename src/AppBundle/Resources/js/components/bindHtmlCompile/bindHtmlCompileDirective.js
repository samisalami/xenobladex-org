'use strict';

angular.module('app')
    .directive('bindHtmlCompile',['$compile', function($compile) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.$watch(function () {
                    return scope.$eval(attrs.bindHtmlCompile);
                }, function (value) {
                    element.html(value);
                    $compile(element.contents())(scope);
                    $(element).trigger('bindHtmlCompile.compiled');
                });
            }
        }
    }]);