'use strict';

angular.module('app')
    .directive('mapmarker',['leafletMapService', '$filter', function(leafletMapService, $filter) {
        return {
            restrict: 'E',
            templateUrl: 'js/components/leafletMap/mapmarker/mapmarkerView.html',
            controller: ['$scope',function($scope) {
                var that = this;

                init();

                function init() {

                }
            }],
            link: function($scope, element, attrs) {
                var modalDomIndex = angular.element('.mapmarker-modal').length;
                var leafletMapDomIndex = angular.element('.leaflet-map').length;
                $scope.modalId = 'mapmarker-modal-' + modalDomIndex;
                $scope.leafletMapId = 'leaflet-map-' + leafletMapDomIndex;

                var map = L.map($scope.leafletMapId, {
                    zoom: 2,
                    minZoom: 1,
                    maxZoom: 5,
                    center: [0,0]
                });

                leafletMapService.tileLayer(map);
            },
            controllerAs: 'vm'
        }
    }]);