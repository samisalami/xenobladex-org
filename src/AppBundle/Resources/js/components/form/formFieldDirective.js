'use strict';

angular.module('app')
    .directive('formField',['formFieldTemplate',function(formFieldTemplate) {
        return {
            restrict: 'E',
            templateUrl:function(elem, attrs){
                return formFieldTemplate[attrs.formFieldTemplate];
            },
            replace: true,
            scope: {
                formFieldBind: '='
            },
            link: function($scope, element, attrs) {
                $scope.contentId = 'form-field-'+Date.now();
                $scope.formFieldLabel = attrs.formFieldLabel;
            }
        }
    }]);