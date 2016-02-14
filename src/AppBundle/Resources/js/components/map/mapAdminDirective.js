'use strict';

angular.module('app')
    .directive('mapAdmin',['mapService', 'attachmentService', 'flashService', '$filter', function(mapService, attachmentService, flashService, $filter) {
        return {
            templateUrl:'js/components/map/mapAdminView.html',
            replace: true,
            link: function($scope, $element,$attrs){
                $scope.newMap = {};

                var initFormModel = function() {
                    $scope.formModel = {
                        orderBy: 'name',
                        fields: [
                            {
                                label: 'Beschreibung',
                                name: 'description',
                                type: 'textarea'
                            },
                            {
                                label: 'Bild',
                                name: 'attachment',
                                type: 'customAttachmentInput',
                                attachmentType: 'image',
                                data: $scope.attachments
                            },
                            {
                                label: 'Segment - Durchmesser',
                                name: 'grid_tile_diameter',
                                type: 'inputText',
                                fieldInfoTooltip: 'Wert in Pixeln. Nur Zahlen erlaubt.'
                            },
                            //{
                            //    label: 'Segment - Abstand',
                            //    name: 'grid_tile_margin',
                            //    type: 'inputText',
                            //    fieldInfoTooltip: 'Wert in Pixeln. Nur Zahlen erlaubt.'
                            //},
                            {
                                label: 'Raster - Breite',
                                name: 'grid_width',
                                type: 'inputText',
                                fieldInfoTooltip: 'Muss nicht exakt sein, Wert in Pixeln. Nur Zahlen erlaubt.'
                            },
                            {
                                label: 'Raster - Höhe',
                                name: 'grid_height',
                                type: 'inputText',
                                fieldInfoTooltip: 'Muss nicht exakt sein, Wert in Pixeln. Nur Zahlen erlaubt.'
                            },
                            {
                                label: 'Raster horizontal verschieben um...',
                                name: 'grid_offset_x',
                                type: 'inputText',
                                fieldInfoTooltip: 'Wert in Pixeln. Nur Zahlen erlaubt.'
                            },
                            {
                                label: 'Raster vertikal verschieben um...',
                                name: 'grid_offset_y',
                                type: 'inputText',
                                fieldInfoTooltip: 'Wert in Pixeln. Nur Zahlen erlaubt.'
                            }
                        ]
                    };
                };

                var getMaps = function() {
                    mapService.getMaps(function(response){
                        $scope.maps = response;
                    });
                };

                getMaps();

                attachmentService.getAttachments(function(attachments){
                    $scope.attachments = attachments;
                    initFormModel();
                });

                $scope.updateMap = function(map) {
                    mapService.updateMap(map);
                };

                $scope.addMap = function(map) {
                    if(map) {
                        mapService.addMap(map, function(){
                            getMaps();
                            $scope.newMap = {};
                            flashService.clear();
                        });
                    } else {
                        flashService.error('Komplett leere Daten werden nicht angelegt.');
                    }
                };

                $scope.deleteMap = function(map) {
                    mapService.deleteMap(map.id, function(deletedMap){
                        $scope.deletedMap = deletedMap;
                        var index = $scope.maps.indexOf(map);
                        if(index !== -1) {
                            $scope.maps.splice(index,1);
                        }
                    });
                };

                $scope.addDeletedMap = function() {
                    $scope.addMap($scope.deletedMap);
                    $scope.deletedMap = null;
                };
            }
        }
    }]);