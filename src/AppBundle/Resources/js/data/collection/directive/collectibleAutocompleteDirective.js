'use strict';

angular.module('app')
    .directive('collectibleAutocomplete',['$filter', function($filter) {
        return {
            restrict: 'E',
            templateUrl: 'js/data/collection/view/collectibleAutocompleteView.html',
            scope: {
                bindCollectible: "=",
                options: "="
            },
            controller: ['$scope',function($scope) {
                var that = this;
                that.collectible = $scope.bindCollectible ? $.extend({},$filter('byId')($scope.options, $scope.bindCollectible),true) : {};
                that.options = $scope.options;

                that.updateCollectible = function() {
                    if(that.collectible.id) {
                        $scope.bindCollectible = that.collectible.id
                    }
                }
            }],
            controllerAs: 'autocomplete'
        }
    }]);