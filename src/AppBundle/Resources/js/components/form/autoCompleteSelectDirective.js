'use strict';

angular.module('app')
    .directive('autocompleteSelect',[function() {
        return {
            templateUrl:'templates/autocompleteSelectView.html',
            replace: true,
            scope: {
                autocompleteList: '=',
                autocompleteBind: '=',
                autocompleteTextInputBind: '='
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

                //TODO: is element really the element of this instance?
                var $selectInputElm = element.find('.autocomplete-select-input');
                $selectInputElm.autocomplete({
                    source: uiAutocompleteList,
                    minLength: 0,
                    focus: function( event, ui ) {
                        $selectInputElm.val(ui.item.value);
                        return false;
                    },
                    select: function( event, ui ) {
                        $selectInputElm.val(ui.item.value);
                        $scope.$apply(function () {
                            $scope.autocompleteBind = ui.item.id;
                        });
                        return false;
                    }
                });

                $scope.selectOption = function(listItem) {
                    $selectInputElm.val(listItem[$scope.autocompleteOptionName]);
                    $scope.autocompleteBind = listItem[$scope.autocompleteOptionValue];
                    $scope.autocompleteTextInputBind = listItem[$scope.autocompleteOptionName];
                    element.find('#'+$scope.selectModalId).modal('hide');
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