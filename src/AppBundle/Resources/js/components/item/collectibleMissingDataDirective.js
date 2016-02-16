angular.module('app')
    .directive('collectibleMissingData',['itemService', '$filter', function(itemService, $filter) {
        return {
            restrict: 'E',
            templateUrl: 'js/components/item/collectibleMissingDataView.html',
            replace: true,
            link: function($scope, $element,$attrs) {
                itemService.getCollectibles(function(response){
                    $scope.collectibles = response;
                });
            }
        }
    }]);