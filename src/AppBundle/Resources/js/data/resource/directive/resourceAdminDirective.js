'use strict';

angular.module('app')
    .directive('resourceAdmin',['ResourceService', function(ResourceService) {
        return {
            replace: true,
            controller: ['$scope',function($scope) {
                var that = this;
                init();

                function init() {
                    ResourceService.onResourcesChanged(setResources);
                    ResourceService.onResourceDeleted(setDeletedResource);
                    setResources(ResourceService.getResources());

                    that.newResource = ResourceService.Resource;
                }

                function setResources(resources) {
                    that.resources = resources;
                }

                function setDeletedResource(resource) {
                    that.deletedResource = resource;
                    delete that.deletedResource.id;
                }

                that.addDeletedResource = function() {
                    ResourceService.addResource(that.deletedResource);
                    delete that.deletedResource;
                };
            }],
            controllerAs: 'vm'
        }
    }]);