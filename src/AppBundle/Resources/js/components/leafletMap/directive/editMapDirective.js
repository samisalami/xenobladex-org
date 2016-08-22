'use strict';

angular.module('app')
    .directive('editMap',['EditableLeafletMapService', '$filter', function(EditableLeafletMapService, $filter) {
        return {
            restrict: 'E',
            templateUrl: 'js/components/leafletMap/directive/editMapView.html',
            scope: {
                'bindTo': "="
            },
            controller: ['$scope',function($scope) {
                var that = this;

                init();

                function init() {

                }
            }],
            link: function($scope, element, attrs) {
                var map = EditableLeafletMapService.getMap();
                var $leafletMap = EditableLeafletMapService.getMapElement();

                $('.modal', $(element)).on('show.bs.modal', function(e) {
                    $('.leaflet-map', $(element)).append($leafletMap);
                    EditableLeafletMapService.clearMap();
                    EditableLeafletMapService.onChanged(save);
                    EditableLeafletMapService.onCreated(save);
                    if ($scope.bindTo) {
                        console.log($scope.bindTo);
                        EditableLeafletMapService.setData(JSON.parse($scope.bindTo));
                    }
                });

                function save() {
                    $scope.bindTo = JSON.stringify(EditableLeafletMapService.getGeoJson());
                }
            },
            controllerAs: 'vm'
        }
    }]);