'use strict';

angular.module('app')
    .directive('mapAdmin',['mapService', 'attachmentService', '$filter', function(mapService, attachmentService, $filter) {
        return {
            templateUrl:'templates/mapAdminView.html',
            replace: true,
            link: function($scope, $element,$attrs){
                var resetNewMap = function() {
                    $scope.newMap = {
                        name: '',
                        description: '',
                        attachment: null
                    };
                };

                resetNewMap();

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
            }
        }
    }]);