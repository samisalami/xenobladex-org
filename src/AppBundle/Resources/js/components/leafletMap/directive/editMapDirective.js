'use strict';

angular.module('app')
    .directive('editMap',['EditableLeafletMapService', '$filter', function(EditableLeafletMapService, $filter) {
        return {
            restrict: 'E',
            templateUrl: 'js/components/leafletMap/directive/editMapView.html',
            controller: ['$scope',function($scope) {
                var that = this;

                init();

                function init() {
                    that.map = EditableLeafletMapService.getMap();
                }

                that.save = function() {
                  console.log(JSON.stringify(EditableLeafletMapService.getGeoJson()));
                }
            }],
            link: function($scope, element, attrs) {
                var $leafletMap = EditableLeafletMapService.getMapElement();

                $('.modal', $(element)).on('show.bs.modal', function(e) {
                    $('.leaflet-map', $(element)).append($leafletMap);
                });
            },
            controllerAs: 'vm'
        }
    }]);