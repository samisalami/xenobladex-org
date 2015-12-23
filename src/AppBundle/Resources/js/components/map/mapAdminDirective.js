'use strict';

angular.module('app')
    .directive('mapAdmin',['mapService', 'attachmentService', 'flashService', '$filter', function(mapService, attachmentService, flashService, $filter) {
        return {
            templateUrl:'templates/mapAdminView.html',
            replace: true,
            link: function($scope, $element,$attrs){
                $scope.newMap = {};

                mapService.getMaps(function(response){
                    $scope.maps = response;
                });

                $scope.attachmentsLoaded = false;
                attachmentService.getAttachments(function(attachments){
                    $scope.attachments = attachments;
                    $scope.attachmentsLoaded = true;
                });

                $scope.updateMap = function(map) {
                    mapService.updateMap(map);
                };

                $scope.addMap = function(map) {
                    if(map) {
                        mapService.addMap(map, function(){
                            mapService.getMaps(function(response){
                                $scope.maps = response;
                            });
                            $scope.newMap = {};
                            flashService.clear();
                        });
                    } else {
                        flashService.error('Komplett leere Daten werden nicht angelegt.');
                    }
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
            }
        }
    }]);