'use strict';

angular.module('app')
    .directive('collectibleForm',['CollectibleService', function(CollectibleService) {
        return {
            restrict: 'E',
            replace: false,
            templateUrl: 'js/data/collection/view/collectibleFormView.html',
            scope: {
                collectibleSealed: "=collectible",
                addForm: "@"
            },
            controller: ['$scope',function($scope) {
                var that = this;
                init();

                function init() {
                    setFormCollectible($scope.collectibleSealed);
                }

                function setFormCollectible(collectible) {
                    that.collectible = $.extend({}, collectible, true);
                }

                that.updateCollectible = function() {
                    if(that.collectible.id) {
                        CollectibleService.updateCollectible(that.collectible);
                    } else {
                        CollectibleService.addCollectible(that.collectible);
                        setFormCollectible($scope.collectibleSealed);
                    }
                }
            }],
            controllerAs: 'form'
        }
    }]);