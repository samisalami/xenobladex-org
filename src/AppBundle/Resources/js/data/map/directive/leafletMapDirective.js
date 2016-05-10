'use strict';

angular.module('app')
    .directive('leafletMap',['$filter', function( $filter) {
        return {
            restrict: 'EA',
            template: '<div id="map" style="width: 800px; height: 800px;"></div>',
            controller: ['$scope',function($scope) {
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
            }],
            link: function() {

            }
        }
    }]);