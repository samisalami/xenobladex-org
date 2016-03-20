'use strict';

angular.module('app')
    .directive('collectionCategoryAdmin',['CollectionCategoryService',  function(CollectionCategoryService) {
        return {
            restrict: "E",
            replace: true,
            scope: true,
            controller: ['$scope',function($scope) {
                var that = this;
                init();

                function init() {
                    CollectionCategoryService.onCollectionCategoriesChanged(setCollectionCategories);
                    CollectionCategoryService.onCollectionCategoryDeleted(setDeletedCollectionCategory);
                    setCollectionCategories(CollectionCategoryService.getCollectionCategories());

                    that.newCollectionCategory = CollectionCategoryService.CollectionCategory;
                }

                function setCollectionCategories(collectionCategories) {
                    that.collectionCategories = collectionCategories;
                }

                function setDeletedCollectionCategory(collectionCategory) {
                    that.deletedCollectionCategory = collectionCategory;
                    delete that.deletedCollectionCategory.id;
                }

                that.addDeletedCollectionCategory = function() {
                    CollectionCategoryService.addCollectionCategory(that.deletedCollectionCategory);
                    delete that.deletedCollectionCategory;
                };
            }],
            controllerAs: 'vm'
        }
    }]);