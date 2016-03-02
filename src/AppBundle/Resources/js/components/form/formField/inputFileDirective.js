'use strict';

angular.module('app')
    .directive('inputFile',['$parse',function($parse) {
        return {
            restrict: 'E',
            templateUrl:'js/components/form/formField/inputFileView.html',
            replace: true,
            scope: {
                fileread: '='
            },
            link: function(scope, element) {
                element.bind('change', function(changeEvent){
                    scope.$apply(function(){
                        scope.fileread = changeEvent.target.files[0];
                    });
                });
            }
        }
    }]);