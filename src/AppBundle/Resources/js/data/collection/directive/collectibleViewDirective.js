'use strict';

angular.module('app')
    .directive('collectibleView',['CollectibleService','CollectionGroupService','CollectionService','$filter', '$location', '$anchorScroll', '$timeout', function(CollectibleService, CollectionGroupService, CollectionService, $filter, $location, $anchorScroll, $timeout) {
        return {
            restrict: 'EA',
            controller: ['$scope',function($scope){
                var that = this;
                that.scrolled = false;
                init();

                function init() {
                    CollectibleService.onCollectiblesChanged(setCollectibles);
                    setCollectibles(CollectibleService.getCollectibles());

                    CollectionService.onCollectionsChanged(setCollections);
                    setCollections(CollectionService.getCollections());

                    CollectionGroupService.onCollectionGroupsChanged(setCollectionGroups);
                    setCollectionGroups(CollectionGroupService.getCollectionGroups());
                }

                function setCollections(collections) {
                    that.collections = collections;
                    setViewData();
                }

                function setCollectionGroups(collectionGroups) {
                    that.collectionGroups = collectionGroups;
                    setViewData();
                }

                function setCollectibles(collectibles) {
                    that.collectibles = collectibles;
                    setViewData();
                }

                function setViewData() {
                    if(that.collectibles && that.collections && that.collectionGroups) {
                        $scope.groupedCollectibles = [];
                        that.collections.forEach(function(collection, index){
                            var collectionArray = {name: collection.region, collectibles: []};
                            var collectionGroups = $filter('filter')(that.collectionGroups, {collection: collection.id},true);
                            var sortedCollectionGroups = $filter('orderBy')(collectionGroups, 'collection_category_prio');
                            console.log(sortedCollectionGroups);
                            sortedCollectionGroups.forEach(function(collectionGroup, gindex){
                                for(var i=1; i<=8; i++) {
                                    var collectible = $filter('byId')(that.collectibles, collectionGroup['collectible'+i]);
                                    if(collectible) {
                                        collectible = $.extend({}, collectible, true);
                                        collectible.slot = i;
                                        collectible.category_name = collectionGroup.collection_category_name;
                                        collectionArray.collectibles.push(collectible);
                                    }
                                }
                            });
                            $scope.groupedCollectibles.push(collectionArray);
                        });

                        var promise = $timeout(function(){
                            if($scope.collectibles) {
                                if($location.hash() && !that.scrolled) {
                                    that.scrolled = true;
                                    $anchorScroll();
                                }
                            }
                            $timeout.cancel(promise);
                        },0);
                    }
                }

                $scope.getValidCssClass = function(string) {
                    var regExp = new RegExp("[^A-Za-z0-9\-_]", "g");
                    return string.replace(regExp, '').toLowerCase();
                };
            }],
            controllerAs: 'vm'
        }
    }]);