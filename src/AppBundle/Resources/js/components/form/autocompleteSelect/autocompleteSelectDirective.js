'use strict';

angular.module('app')
    .directive('autocompleteSelect',['$timeout', '$filter',function($timeout, $filter) {
        return {
            templateUrl:'js/components/form/autocompleteSelect/autocompleteSelectView.html',
            replace: true,
            scope: {
                autocompleteList: '=',
                autocompleteBind: '=',
                autocompleteCallback: '&',
                autocompleteLabel: '@'
            },
            link: function($scope, element, attrs) {
                var domIndex = angular.element('.autocomplete-select-input').length;
                $scope.selectModalId = 'autocomplete-select-modal-'+domIndex;
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
                            $scope.autocompleteBind.id = ui.item.id;
                        });
                        return false;
                    },
                    change: function(event, ui) {
                        var promise = $timeout(function() {
                            $scope.autocompleteCallback();
                            $timeout.cancel(promise);
                        }, 100);
                    }
                }).data("ui-autocomplete")._renderItem = function(ul, item){
                    var label = '';
                    if($scope.autocompleteLabel) {
                        var listItem = $filter('byId')($scope.autocompleteList, item.id);
                        label = '('+listItem[$scope.autocompleteLabel]+')';
                    }
                    return $('<li>')
                        .data('item.autocomplete', item)
                        .append(item.value + ' '+label)
                        .appendTo(ul);
                };

                $scope.selectOption = function(listItem) {
                    $selectInputElm.val(listItem[$scope.autocompleteOptionName]);
                    $scope.autocompleteBind = {};
                    $scope.autocompleteBind.id = listItem[$scope.autocompleteOptionValue];
                    $scope.autocompleteBind.name = listItem[$scope.autocompleteOptionName];
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
                        $scope.autocompleteBind = {};
                        $scope.autocompleteBind.name = value;
                    }
                };
            }
        }
    }]);