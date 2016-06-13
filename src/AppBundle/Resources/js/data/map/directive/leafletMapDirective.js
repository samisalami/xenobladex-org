'use strict';

angular.module('app')
    .directive('leafletMap',['$filter', function( $filter) {
        return {
            restrict: 'EA',
            template: '<div id="map" style="width: 800px; height: 800px;"></div>',
            controller: ['$scope',function($scope) {
                var monsterIcon = L.divIcon({
                    className: 'mapmarker mapmarker-monster',
                    html: '<span>Monster XYZ</span>',
                    iconSize: [12, 12],
                    iconAnchor: [6, 11]
                });

                var missionGeoJSON = [
                    {
                        "type": "Feature",
                        "properties": {
                            "name": "start",
                            "popupContent": "Portoferraio"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [51.5,-0.09]
                        }
                    },
                    {
                        "type": "Feature", "properties": { "name": "Mission 1", "popupContent": "Marciana Marina" },
                        "geometry": { "type": "Point", "coordinates": [55.5,-4] }
                    },
                    {
                        "type": "Feature", "properties": { "name": "Mission 2", "popupContent": "Bastia" },
                        "geometry": { "type": "Point", "coordinates": [53, 5] }
                    },
                    {
                        "type": "Feature", "properties": { "name": "Mission 3", "popupContent": "Campoloro" },
                        "geometry": { "type": "Point", "coordinates": [58.2,-5] }
                    },
                    {
                        "type": "Feature", "properties": { "name": "Mission 4", "popupContent": "Cavo" },
                        "geometry": { "type": "Point", "coordinates": [52.2,-0.09] }
                    }
                ];

                var monsterGeoJSON = [
                    {
                        "type": "Feature",
                        "properties": {
                            "name": "start",
                            "popupContent": "Portoferraio"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [51.5,-0.09]
                        }
                    },
                    {
                        "type": "Feature", "properties": { "name": "Mission 1", "popupContent": "Marciana Marina" },
                        "geometry": { "type": "Point", "coordinates": [60.5,20] }
                    },
                    {
                        "type": "Feature", "properties": { "name": "Mission 2", "popupContent": "Bastia" },
                        "geometry": { "type": "Point", "coordinates": [20, 1] }
                    },
                    {
                        "type": "Feature", "properties": { "name": "Mission 3", "popupContent": "Campoloro" },
                        "geometry": { "type": "Point", "coordinates": [50.2,10] }
                    },
                    {
                        "type": "Feature", "properties": { "name": "Mission 4", "popupContent": "Cavo" },
                        "geometry": { "type": "Point", "coordinates": [40.2,-5] }
                    }
                ];

                var missionMarker = new L.geoJson(missionGeoJSON, {
                    onEachFeature: function(feature, layer) {
                        if (feature.properties && feature.properties.popupContent) {
                            layer.bindPopup(feature.properties.popupContent, {closeButton: false, offset: L.point(0, -20)});
                            layer.on('mouseover', function() { layer.openPopup(); });
                            layer.on('mouseout', function() { layer.closePopup(); });
                        }
                    },
                    pointToLayer: function (feature, latlng) {
                        return new L.Marker(latlng, {
                            icon: L.divIcon({
                                className: 'mapmarker mapmarker-mission',
                                html: '<span>'+feature.properties.name+'</span>',
                                iconSize: [12, 12],
                                iconAnchor: [6, 11]
                            })
                        });
                    }
                });

                var monsterMarker = new L.geoJson(monsterGeoJSON, {
                    onEachFeature: function(feature, layer) {
                        if (feature.properties && feature.properties.popupContent) {
                            layer.bindPopup(feature.properties.popupContent, {closeButton: false, offset: L.point(0, -20)});
                            layer.on('mouseover', function() { layer.openPopup(); });
                            layer.on('mouseout', function() { layer.closePopup(); });
                        }
                    },
                    pointToLayer: function (feature, latlng) {
                        return new L.Marker(latlng, {
                            icon: L.divIcon({
                                className: 'mapmarker mapmarker-monster',
                                html: '<span>'+feature.properties.name+'</span>',
                                iconSize: [12, 12],
                                iconAnchor: [6, 11]
                            })
                        });
                    }
                });

                var mapWidth = 8192;
                var mapHeight = 8192;

                var hexHeight,
                    hexRadius,
                    hexRectangleHeight,
                    hexRectangleWidth,
                    hexagonAngle = 0.523598776, // 30 degrees in radians
                    sideLength = 300,
                    boardWidth = 8192,
                    boardHeight = 8192,
                    coordinates = [];

                hexHeight = Math.sin(hexagonAngle) * sideLength;
                hexRadius = Math.cos(hexagonAngle) * sideLength;
                hexRectangleHeight = sideLength + 2 * hexHeight;
                hexRectangleWidth = 2 * hexRadius;

                var hexCount = Math.floor(boardWidth/(sideLength*1.5));

                for(var i = 0; i < hexCount; ++i) {
                    for(var j = 0; j < hexCount; ++j) {
                        drawHexagon(
                            i * hexRectangleWidth + ((j % 2) * hexRadius),
                            j * (sideLength + hexHeight)
                        );
                    }
                }

                function drawHexagon(x, y) {
                    coordinates.push(
                        [
                            [x + hexRadius, y],
                            [x + hexRectangleWidth, y + hexHeight],
                            [x + hexRectangleWidth, y + hexHeight + sideLength],
                            [x + hexRadius, y + hexRectangleHeight],
                            [x, y + sideLength + hexHeight],
                            [x, y + hexHeight]
                        ]
                    );
                }

                var segmentData = {
                    type: 'FeatureCollection',
                    features: [
                        {
                            type: 'Feature',
                            geometry: {
                                type:  'MultiPolygon',
                                coordinates: [coordinates]
                            }
                        }
                    ]
                };


                var map = L.map('map', {
                    zoom: 2,
                    minZoom: 1,
                    maxZoom: 5,
                    center: [0,0],
                    layers: [monsterMarker, missionMarker]
                });

                var segments = L.geoJson(segmentData, {
                    coordsToLatLng: function(coordinates) {
                        return (map.unproject([coordinates[1], coordinates[0]], map.getMaxZoom()));
                    },
                    pointToLayer: function (feature, coords) {
                        return L.multiPolygon(coords);
                    }
                }).addTo(map);

                L.tileLayer('https://www.xenobladex.org/maps/mira8192/{z}/{x}/{y}.png', {
                    attribution: '© XenobladeX.org',
                    tms: true,
                    noWrap: true
                }).addTo(map);
                var southWest = map.unproject([0,mapWidth], map.getMaxZoom());
                var northEast = map.unproject([mapHeight,0], map.getMaxZoom());
                map.setMaxBounds(new L.LatLngBounds(southWest, northEast));

                var overlayMaps = {
                    "Kreaturen": monsterMarker,
                    "Missionen": missionMarker,
                    "Segmente": segments
                };

                L.control.layers(null, overlayMaps).addTo(map);

                map.on('click', addMarker);

                function addMarker(event) {
                    L.marker(event.latlng).addTo(map);
                }
            }]
        }
    }]);