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

                var monsterMarkers = [
                    L.marker([51.5,-0.09], {title: 'Monster 1', riseOnHover: true}).bindPopup('Beschreibung 1'),
                    L.marker([50.5,-0.07], {title: 'Monster 2', riseOnHover: true}).bindPopup('Beschreibung 1'),
                    L.marker([53, -0.1], {title: 'Monster 3', riseOnHover: true}).bindPopup('Beschreibung 1'),
                    L.marker([52.2,-0.09], {title: 'Monster4', riseOnHover: true}).bindPopup('Beschreibung 1'),
                    L.marker([51.5,-1.5], {title: 'Monster 5', riseOnHover: true}).bindPopup('Beschreibung 1')
                ];

                var missionMarkers = [
                    L.marker([40.5,2], {title: 'Mission 1', riseOnHover: true}).bindPopup('Beschreibung 1'),
                    L.marker([33.5,-0.07], {title: 'Mission 2', riseOnHover: true}).bindPopup('Beschreibung 1'),
                    L.marker([60, 3], {title: 'Mission 3', riseOnHover: true}).bindPopup('Beschreibung 1'),
                    L.marker([50.2,2.5], {title: 'Mission 4', riseOnHover: true}).bindPopup('Beschreibung 1'),
                    L.marker([45,-1.5], {title: 'Mission 5', riseOnHover: true}).bindPopup('Beschreibung 1')
                ];

                var monsters = L.layerGroup(monsterMarkers);
                var missions = L.layerGroup(missionMarkers);

                var map = L.map('map', {
                    zoom: 2,
                    center: [0,0],
                    layers: [monsters, missions]
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
                    "Monsters": monsters,
                    "Missions": missions
                };

                L.control.layers(null, overlayMaps).addTo(map);

                map.on('click', addMarker);

                function addMarker(event) {
                    var newMarker = L.marker(event.latlng).addTo(map);
                }
            }],
            link: function() {
            }
        }
    }]);