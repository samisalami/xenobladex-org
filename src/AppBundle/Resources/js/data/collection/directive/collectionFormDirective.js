'use strict';

angular.module('app')
    .directive('collectionForm',['CollectionService','CollectionGroupService','CollectionCategoryService', 'RegionService', '$filter', function(CollectionService, CollectionGroupService, CollectionCategoryService, RegionService, $filter) {
        return {
            restrict: 'E',
            replace: false,
            templateUrl: 'js/data/collection/view/collectionFormView.html',
            scope: {
                collectionSealed: "=collection",
                addForm: "@"
            },
            controller: ['$scope',function($scope) {
                var that = this;
                init();

                function init() {
                    setFormCollection($scope.collectionSealed);
                    setRegions(RegionService.Regions);

                    CollectionGroupService.onCollectionGroupsChanged(setCollectionGroups);
                    setCollectionGroups(CollectionGroupService.getCollectionGroups());
                    
                    CollectionCategoryService.onCollectionCategoriesChanged(setCollectionCategories);
                    setCollectionCategories(CollectionCategoryService.getCollectionCategories());
                }

                function setRegions(regions) {
                    that.regions = regions;
                }

                function setCollectionGroups(collectionGroups) {
                    that.collectionGroups = collectionGroups;
                }
                
                function setCollectionCategories(collectionCategories) {
                    that.collectionCategories = collectionCategories;
                }

                function setFormCollection(collection) {
                    that.collection = $.extend({}, collection, true);
                }

                that.createCollectionGroups = function() {
                    if($filter('filter')(that.collectionGroups, {collection: that.collection.id}).length == 0) {
                        var categoryCount = that.collectionCategories.length;
                        for(var x=0; x<categoryCount; x++) {
                            var category = that.collectionCategories[x];

                            var collectionGroup = [
                                {
                                    collection_category: category.id,
                                    collection: that.collection.id
                                }
                            ];

                            CollectionGroupService.addCollectionGroup(collectionGroup);
                        }
                    }
                };

                that.deleteCollectionGroups = function() {
                    var collectionGroups = $filter('filter')(that.collectionGroups, {collection: that.collection.id});
                    if(collectionGroups.length>0) {
                        var count = collectionGroups.length;
                        for(var i=0;i<count;i++) {
                            CollectionGroupService.deleteCollectionGroup(collectionGroups[i]);
                        }
                    }
                };

                that.deleteCollection = function() {
                    CollectionService.deleteCollection(that.collection);
                };

                that.updateCollection = function() {
                    if(that.collection.id) {
                        CollectionService.updateCollection(that.collection);
                    } else {
                        CollectionService.addCollection(that.collection);
                        setFormCollection($scope.collectionSealed);
                    }
                }
            }],
            controllerAs: 'form'
        }
    }]);