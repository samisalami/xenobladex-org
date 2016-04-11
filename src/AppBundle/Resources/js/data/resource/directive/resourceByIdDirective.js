angular.module('app')
    .directive('resourceById',['$filter','ResourceService', function($filter, ResourceService) {
        return {
            restrict: 'A',
            link: function($scope, $element,$attrs){
                var resourceId = $attrs.resourceById;

                if(resourceId) {
                    ResourceService.onResourcesChanged(setResourceById);
                    setResourceById(ResourceService.getResources());
                }

                function setResourceById(resources) {
                    $scope.resourceById = $filter('byId')(resources, resourceId) || null;
                }
            }
        }
    }]);