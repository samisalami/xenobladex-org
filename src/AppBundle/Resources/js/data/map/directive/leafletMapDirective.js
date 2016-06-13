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

                //var missions = L.layerGroup(missionMarker);
                //var monsters = L.layerGroup(monsterMarker);

                var map = L.map('map', {
                    zoom: 2,
                    center: [0,0],
                    layers: [monsterMarker, missionMarker]
                });

                L.tileLayer('https://www.xenobladex.org/maps/mira8192/{z}/{x}/{y}.png', {
                    minZoom: 1,
                    maxZoom: 5,
                    continuousWorld: true,
                    attribution: '© XenobladeX.org',
                    tms: true,
                    noWrap: true
                }).addTo(map);
                var southWest = map.unproject([0,8192], map.getMaxZoom());
                var northEast = map.unproject([8192,0], map.getMaxZoom());
                map.setMaxBounds(new L.LatLngBounds(southWest, northEast));

                var overlayMaps = {
                    "Monsters": monsterMarker,
                    "Missions": missionMarker
                };

                L.control.layers(null, overlayMaps).addTo(map);

                map.on('click', addMarker);

                function addMarker(event) {
                    L.marker(event.latlng).addTo(map);
                }
            }]
        }
    }]);