'use strict';

angular.module('app')
    .directive('autocompleteSelect',['$timeout',function($timeout) {
        return {
            templateUrl:'js/components/form/autocompleteSelectView.html',
            replace: true,
            scope: {
                autocompleteList: '=',
                autocompleteBind: '=',
                autocompleteTextInputBind: '=',
                autocompleteCallback: '&'
            },
            link: function($scope, element, attrs) {
                var contentId = $('.autocomplete-select-input').length;
                $scope.selectModalId = 'autocomplete-select-modal-'+contentId;
                $scope.modalFilterValue = '';
                $scope.autocompleteOptionName = attrs.autocompleteOptionName;
                $scope.autocompleteOptionValue = attrs.autocompleteOptionValue;

                var uiAutocompleteList = [];
                $scope.autocompleteList.forEach(function(listItem){
                   uiAutocompleteList.push({value:listItem[$scope.autocompleteOptionName], id:listItem[$scope.autocompleteOptionValue]})
                });

                var $selectInputElm = element.find('.autocomplete-select-input');
                $selectInputElm.autocomplete({
                    source: uiAutocompleteList,
                    minLength: 2,
                    delay: 0,
                    focus: function( event, ui ) {
                        $selectInputElm.val(ui.item.value);
                        return false;
                    },
                    select: function( event, ui ) {
                        $selectInputElm.val(ui.item.value);
                        $scope.$apply(function () {
                            $scope.autocompleteBind = ui.item.id;
                            $scope.autocompleteTextInputBind = ui.item.value;
                        });
                        return false;
                    },
                    change: function(event, ui) {
                        var promise = $timeout(function() {
                            $scope.autocompleteCallback();
                            $timeout.cancel(promise);
                        }, 100);
                    }
                });

                $scope.selectOption = function(listItem) {
                    $selectInputElm.val(listItem[$scope.autocompleteOptionName]);
                    $scope.autocompleteBind = listItem[$scope.autocompleteOptionValue];
                    $scope.autocompleteTextInputBind = listItem[$scope.autocompleteOptionName];
                    if(element.find('#'+$scope.selectModalId).is(':visible')) {
                        element.find('#'+$scope.selectModalId).modal('hide');
                        var promise = $timeout(function() {
                            $scope.autocompleteCallback();
                            $timeout.cancel(promise);
                        }, 100);
                    }
                };

                $scope.setBindings = function() {
                    var value = $selectInputElm.val();
                    var exists = $scope.autocompleteList.some(function(listItem){
                        if(listItem[$scope.autocompleteOptionName] == value) {
                            $scope.selectOption(listItem);
                        }
                        return listItem[$scope.autocompleteOptionName] == value;
                    });

                    if(!exists) {
                        $scope.autocompleteBind = null;
                    }
                };
            }
        }
    }]);