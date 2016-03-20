angular.module('app')
    .directive('collectionCategoryById',['$filter','CollectionCategoryService', function($filter, CollectionCategoryService) {
        return {
            restrict: 'A',
            link: function($scope, $element,$attrs){
                var collectionCategoryId = $attrs.collectionCategoryById;

                if(collectionCategoryId) {
                    CollectionCategoryService.onCollectionCategoriesChanged(setCollectionCategoryById);
                    setCollectionCategoryById(CollectionCategoryService.getCollectionCategories());

                }

                function setCollectionCategoryById(collectionCategories) {
                    $scope.collectionCategoryById = $filter('byId')(collectionCategories, collectionCategoryId) || null;
                }
            }
        }
    }]);