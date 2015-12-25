'use strict';

angular.module('app')
    .directive('formField',['formTemplateFactory', '$filter',function(formTemplateFactory, $filter) {
        return {
            restrict: 'E',
            scope: {
                formFieldBind: '=',
                formFieldAction: '&',
                formTemplate: '@',
                formSelectOptions: '='
            },
            link: function($scope, element, attrs) {
                $scope.contentId = 'form-field-'+Date.now();
                $scope.formFieldLabel = attrs.formFieldLabel;
                $scope.getTemplate = function() {
                    return formTemplateFactory[$scope.formTemplate];
                };

                $scope.showSelectedOption = function(id) {
                    var selected = $filter('filter')($scope.formSelectOptions, {id: id});
                    return ($scope.formSelectOptions && selected.length) ? selected[0].name : false;
                };
            },
            template: '<div ng-include="getTemplate()"></div>'
        }
    }]);