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
            link: function($scope, element, attrs) {
                $scope.attachmentType = attrs.attachmentType;
                $scope.contentId = 'form-field-'+Date.now();
                $scope.formFieldLabel = attrs.formFieldLabel;

                $scope.getTemplate = function() {
                    return formTemplateFactory[$scope.formTemplate];
                };

                $scope.showSelectedOption = function(id) {
                    if(id) {
                        var selected = $filter('filter')($scope.formSelectOptions, {id: id});
                        return (selected.length>0) ? selected[0].name : false;
                    } else {
                        return false;
                    }

                };
            },
            template: '<div ng-include="getTemplate()"></div>'
        }
    }]);