'use strict';

angular.module('app')
    .directive('collectibleForm',['CollectibleService', 'RarityService', function(CollectibleService, RarityService) {
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
                    setRarities(RarityService.Rarities);
                }

                function setRarities(rarities) {
                    that.rarities = rarities;
                }

                function setFormCollectible(collectible) {
                    that.collectible = $.extend({}, collectible, true);
                }

                that.deleteCollectible = function() {
                    CollectibleService.deleteCollectible(that.collectible);
                };

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