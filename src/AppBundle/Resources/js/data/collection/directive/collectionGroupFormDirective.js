'use strict';

angular.module('app')
    .directive('collectionGroupForm',['CollectionGroupService','CollectibleService', '$filter', function(CollectionGroupService, CollectibleService, $filter) {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: 'js/data/collection/view/collectionGroupFormView.html',
            scope: {
                collectionGroupSealed: "=collectionGroup",
                addForm: "@"
            },
            controller: ['$scope',function($scope) {
                var that = this;
                init();

                function init() {
                    setFormCollectionGroup($scope.collectionGroupSealed);
                    setRegions(RegionService.Regions);

                    CollectibleService.onCollectiblesChanged(setCollectibles);
                    setCollectibles(CollectibleService.getCollectibles());
                }

                function setRegions(regions) {
                    that.regions = regions;
                }

                function setCollectibles(collectibles) {
                    that.collectibles = collectibles;
                }

                function setFormCollectionGroup(collectionGroup) {
                    that.collectionGroup = $.extend({}, collectionGroup, true);
                }

                that.updateCollectionGroup = function() {
                    console.log(that.collectionGroup.collectible1);
                    //if(that.collectionGroup.id) {
                    //    CollectionGroupService.updateCollectionGroup(that.collectionGroup);
                    //} else {
                    //    CollectionGroupService.addCollectionGroup(that.collectionGroup);
                    //    setFormCollectionGroup($scope.collectionGroupSealed);
                    //}
                }
            }],
            controllerAs: 'form'
        }
    }]);