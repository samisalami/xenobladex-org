'use strict';

angular.module('app')
    .directive('leafletMap',['$filter', function( $filter) {
        return {
            restrict: 'EA',
            template: '<div id="map" style="width: 800px; height: 800px;"></div>',
            controller: ['$scope',function($scope) {
                var monsterIcon = L.divIcon({className: 'mapmarker mapmarker-monster', html: '<span>Monster XYZ</span>'});

                var map = L.map('map', {
                    zoom: 2,
                    center: [0,0]
                });
                L.tileLayer('https://www.xenobladex.org/maps/mira8192/{z}/{x}/{y}.png', {
                    minZoom: 1,
                    maxZoom: 5,
                    continuousWorld: true,
                    attribution: '© XenobladeX.org',
                    tms: true,
                    noWrap: true
                }).addTo(map);

                var marker = L.marker([51.5,-0.09], {icon: monsterIcon}).addTo(map);
                marker.bindPopup("In einer Höhle");

                map.on('click', addMarker);

                function addMarker(event) {
                    var newMarker = L.marker(event.latlng, {icon: monsterIcon}).addTo(map);
                }
            }],
            link: function() {
            }
        }
    }]);