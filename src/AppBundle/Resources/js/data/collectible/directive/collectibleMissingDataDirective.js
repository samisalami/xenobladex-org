angular.module('app')
    .directive('collectibleMissingData',['CollectibleService', function(CollectibleService) {
        return {
            restrict: 'E',
            templateUrl: 'js/data/collectible/view/collectibleMissingDataView.html',
            replace: true,
            link: function($scope, $element,$attrs) {
                init();

                function init() {
                    CollectibleService.onCollectiblesChanged(setCollectibles);
                    setCollectibles(CollectibleService.getCollectibles());
                }

                function setCollectibles(collectibles) {
                    $scope.collectibles = collectibles;
                }
            }
        }
    }]);