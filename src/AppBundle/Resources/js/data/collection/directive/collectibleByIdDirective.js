angular.module('app')
    .directive('collectibleById',['$filter','CollectibleService', function($filter, CollectibleService) {
        return {
            restrict: 'A',
            scope: true,
            link: function($scope, $element,$attrs){
                var collectibleId = $attrs.collectibleById;

                if(collectibleId) {
                    CollectibleService.onCollectiblesChanged(setCollectibleById);
                    setCollectibleById(CollectibleService.getCollectibles());
                } else {
                    $scope.collectibleById = {};
                }

                function setCollectibleById(collectibles) {
                    $scope.collectibleById = $filter('byId')(collectibles, collectibleId) || null;
                }
            }
        }
    }]);