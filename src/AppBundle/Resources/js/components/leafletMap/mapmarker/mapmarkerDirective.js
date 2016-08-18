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
                    that.map = leafletMapService.getMap();
                }
            }],
            link: function($scope, element, attrs) {
                var modalDomIndex = angular.element('.mapmarker-modal').length;
                var $leafletMap = leafletMapService.getMapElement();
                $scope.modalId = 'mapmarker-modal-' + modalDomIndex;

                $('.modal', $(element)).on('show.bs.modal', function(e) {
                    $('.leaflet-map', $(element)).append($leafletMap);
                });
            },
            controllerAs: 'vm'
        }
    }]);