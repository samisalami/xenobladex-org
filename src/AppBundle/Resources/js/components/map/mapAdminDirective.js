'use strict';

angular.module('app')
    .directive('mapAdmin',['mapService', '$filter', function(mapService, $filter) {
        return {
            restrict: 'E',
            templateUrl:'templates/mapAdminView.html',
            replace: true,
            link: function($scope, $element,$attrs){
                var resetNewMap = function() {
                    $scope.newMap = {
                        name: '',
                        image_path:''
                    };
                };

                resetNewMap();

                mapService.getMaps(function(response){
                    $scope.maps = response;
                });

                $scope.updateMap = function(map) {
                    mapService.updateMap(map);
                };

                $scope.addMap = function(map) {
                    mapService.addMap(map, function(map){
                        $scope.maps = $scope.maps.concat(map);
                        resetNewMap();
                    });
                };

                $scope.deleteMap = function(id, index) {
                    mapService.deleteMap(id, function(map){
                        $scope.maps.splice(index, 1);
                        $scope.deletedMap = map;
                    });
                };

                $scope.addDeletedMap = function() {
                    $scope.addMap($scope.deletedMap);
                    $scope.deletedMap = null;
                };

                $scope.showMapImage = function($map) {
                    if($map.image_path) {

                    } else {

                    }
                };
            }
        }
    }]);