angular.module('app')
    .directive('collectibleById',['$filter','CollectibleService', function($filter, CollectibleService) {
        return {
            restrict: 'A',
            link: function($scope, $element,$attrs){
                var collectibleId = $attrs.collectibleById;

                if(collectibleId) {
                    CollectibleService.onCollectiblesChanged(setCollectibleById);
                    setCollectibleById(CollectibleService.getCollectibles());

                }

                function setCollectibleById(collectibles) {
                    $scope.collectibleById = $filter('byId')(collectibles, collectibleId) || null;
                }
            }
        }
    }]);