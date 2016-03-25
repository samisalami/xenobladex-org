'use strict';

angular.module('app')
    .directive('collectionView',['CollectionService', 'CollectionGroupService', '$filter', '$location', '$anchorScroll', '$timeout', function(CollectionService, CollectionGroupService, $filter, $location, $anchorScroll, $timeout) {
        return {
            restrict: 'EA',
            controller: ['$scope',function($scope){
                var that = this;
                that.scrolled = false;
                init();

                function init() {
                    CollectionService.onCollectionsChanged(setCollections);
                    setCollections(CollectionService.getCollections());

                    CollectionGroupService.onCollectionGroupsChanged(setCollectionGroups);
                    setCollectionGroups(CollectionGroupService.getCollectionGroups());
                }

                function setCollectionGroups(collectionGroups) {
                    $scope.collectionGroups = collectionGroups;
                }

                function setCollections(collections) {
                    $scope.collections = collections;

                    var promise = $timeout(function(){
                        if($scope.collections) {
                            if($location.hash() && !that.scrolled) {
                                that.scrolled = true;
                                $anchorScroll();
                            }
                        }
                        $timeout.cancel(promise);
                    },0);
                }
            }]
        }
    }]);