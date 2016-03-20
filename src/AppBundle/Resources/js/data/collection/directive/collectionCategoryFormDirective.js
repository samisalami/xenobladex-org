'use strict';

angular.module('app')
    .directive('collectionCategoryForm',['CollectionCategoryService', function(CollectionCategoryService) {
        return {
            restrict: 'E',
            replace: false,
            templateUrl: 'js/data/collection/view/collectionCategoryFormView.html',
            scope: {
                collectionCategorySealed: "=collectionCategory",
                addForm: "@"
            },
            controller: ['$scope',function($scope) {
                var that = this;
                init();

                function init() {
                    setFormCollectionCategory($scope.collectionCategorySealed);
                }

                function setFormCollectionCategory(collectionCategory) {
                    that.collectionCategory = $.extend({}, collectionCategory, true);
                }

                that.deleteCollectionCategory = function() {
                    CollectionCategoryService.deleteCollectionCategory(that.collectionCategory);
                };

                that.updateCollectionCategory = function() {
                    if(that.collectionCategory.id) {
                        CollectionCategoryService.updateCollectionCategory(that.collectionCategory);
                    } else {
                        CollectionCategoryService.addCollectionCategory(that.collectionCategory);
                        setFormCollectionCategory($scope.collectionCategorySealed);
                    }
                }
            }],
            controllerAs: 'form'
        }
    }]);