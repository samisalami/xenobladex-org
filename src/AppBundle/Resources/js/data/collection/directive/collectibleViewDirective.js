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
                    $scope.collections = collections;
                    setViewData();
                }

                function setCollectionGroups(collectionGroups) {
                    $scope.collectionGroups = collectionGroups;
                    setViewData();
                }

                function setCollectibles(collectibles) {
                    $scope.collectibles = collectibles;
                    setViewData();
                }

                function setViewData() {
                    if($scope.collectibles && $scope.collections && $scope.collectionGroups) {
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
            }]
        }
    }]);