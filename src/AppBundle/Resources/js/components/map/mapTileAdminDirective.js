'use strict';

angular.module('app')
    .directive('mapTileAdmin',['mapService', 'flashService', '$filter', function(mapService, flashService, $filter) {
        return {
            templateUrl:'js/components/map/mapTileAdminView.html',
            replace: true,
            link: function($scope, $element,$attrs){
                $scope.newMap = {};

                mapService.getMaps(function(response){
                    $scope.maps = response;
                });

                $scope.selectMap = function(id){
                    $scope.currentMap = $filter('filter')($scope.maps, {id: id})[0];
                };

                //$scope.updateMap = function(map) {
                //    mapService.updateMap(map);
                //};

                //$scope.addMap = function(map) {
                //    if(map) {
                //        mapService.addMap(map, function(){
                //            mapService.getMaps(function(response){
                //                $scope.maps = response;
                //            });
                //            $scope.newMap = {};
                //            flashService.clear();
                //        });
                //    } else {
                //        flashService.error('Komplett leere Daten werden nicht angelegt.');
                //    }
                //};
                //
                //$scope.deleteMap = function(map) {
                //    mapService.deleteMap(map.id, function(deletedMap){
                //        $scope.deletedMap = deletedMap;
                //        var index = $scope.maps.indexOf(map);
                //        if(index !== -1) {
                //            $scope.maps.splice(index,1);
                //        }
                //    });
                //};
                //
                //$scope.addDeletedMap = function() {
                //    $scope.addMap($scope.deletedMap);
                //    $scope.deletedMap = null;
                //};
            }
        }
    }]);