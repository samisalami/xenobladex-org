angular.module('app')
    .directive('materialMissingData',['itemService', '$filter', function(itemService, $filter) {
        return {
            restrict: 'E',
            templateUrl: 'js/components/item/materialMissingDataView.html',
            replace: true,
            link: function($scope, $element,$attrs) {
                var materials = [];

                itemService.getMaterials(function(response){
                    materials = response;
                    $scope.missingDataArray = $filter('missingData')(materials);
                }, 'materialDetail');
            }
        }
    }]);