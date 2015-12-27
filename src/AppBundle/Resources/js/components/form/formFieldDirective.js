'use strict';

angular.module('app')
    .directive('formField',['formTemplateFactory', '$filter',function(formTemplateFactory, $filter) {
        return {
            restrict: 'E',
            scope: {
                formFieldBind: '=',
                formFieldActionParam: '=',
                formFieldAction: '&',
                formTemplate: '@',
                formSelectOptions: '='
            },
            transclude: true,
            link: function($scope, element, attrs) {
                $scope.attachmentType = attrs.attachmentType;
                $scope.contentId = 'form-field-'+Date.now();
                $scope.formFieldLabel = attrs.formFieldLabel;

                $scope.getTemplate = function() {
                    return formTemplateFactory[$scope.formTemplate];
                };

                $scope.showSelectedOption = function(id) {
                    var selected = $filter('filter')($scope.formSelectOptions, {id: id});
                    return ($scope.formSelectOptions && selected.length) ? selected[0].name : false;
                };

                $scope.log = function() {
                    console.log($scope.formFieldBind);
                }
            },
            template: '<div ng-include="getTemplate()"></div>'
        }
    }]);