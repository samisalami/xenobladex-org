'use strict';

angular.module('app')
    .directive('collectibleAdmin',['CollectibleService',  function(CollectibleService) {
        return {
            restrict: "E",
            replace: true,
            controller: ['$scope',function($scope) {
                var that = this;
                init();

                function init() {
                    CollectibleService.onCollectiblesChanged(setCollectibles);
                    CollectibleService.onCollectibleDeleted(setDeletedCollectible);
                    setCollectibles(CollectibleService.getCollectibles());

                    that.newCollectible = CollectibleService.Collectible;
                }

                function setCollectibles(collectibles) {
                    that.collectibles = collectibles;
                }

                function setDeletedCollectible(collectible) {
                    that.deletedCollectible = collectible;
                    delete that.deletedCollectible.id;
                }

                that.addDeletedCollectible = function() {
                    CollectibleService.addCollectible(that.deletedCollectible);
                    delete that.deletedCollectible;
                };
            }],
            controllerAs: 'vm'
        }
    }]);