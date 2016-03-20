'use strict';

angular.module('app')
    .directive('collectionAdmin',['CollectionService',  function(CollectionService) {
        return {
            restrict: "E",
            replace: true,
            scope: true,
            controller: ['$scope',function($scope) {
                var that = this;
                init();

                function init() {
                    CollectionService.onCollectionsChanged(setCollections);
                    CollectionService.onCollectionDeleted(setDeletedCollection);
                    setCollections(CollectionService.getCollections());

                    that.newCollection = CollectionService.Collection;
                }

                function setCollections(collections) {
                    that.collections = collections;
                }

                function setDeletedCollection(collection) {
                    that.deletedCollection = collection;
                    delete that.deletedCollection.id;
                }

                that.addDeletedCollection = function() {
                    CollectionService.addCollection(that.deletedCollection);
                    delete that.deletedCollection;
                };
            }],
            controllerAs: 'vm'
        }
    }]);