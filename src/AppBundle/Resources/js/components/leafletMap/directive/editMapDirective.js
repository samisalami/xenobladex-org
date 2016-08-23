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

                that.init = function() {
                    EditableLeafletMapService.clearMap();
                    EditableLeafletMapService.onChanged(that.save);
                    EditableLeafletMapService.onCreated(that.save);
                    if ($scope.bindTo) {
                        EditableLeafletMapService.setData(JSON.parse($scope.bindTo));
                    }
                };

                that.save = function() {
                    $scope.bindTo = JSON.stringify(EditableLeafletMapService.getGeoJson());
                };
            }],
            link: function($scope, element, attrs, controller) {
                var map = EditableLeafletMapService.getMap();
                var $leafletMap = EditableLeafletMapService.getMapElement();

                $('.modal', $(element)).on('show.bs.modal', function(e) {
                    $('.leaflet-map', $(element)).append($leafletMap);
                    controller.init();
                });
            },
            controllerAs: 'vm'
        }
    }]);