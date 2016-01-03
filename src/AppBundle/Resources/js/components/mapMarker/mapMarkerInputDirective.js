'use strict';

angular.module('app')
    .directive('mapMarkerInput',['mapmarkerService','mapService', '$filter',function(mapMarkerService, mapService, $filter) {
        return {
            restrict: 'E',
            templateUrl:'templates/mapmarkerInputView.html',
            transclude: true,
            replace: true,
            scope: {
            },
            link: function($scope, element, attrs) {
                var personId = attrs.mapMarkerBind;
                $scope.contentId = 'map-marker-input-'+Date.now();

                mapService.getMaps(function(response){
                    $scope.maps = response;
                });
            }
        }
    }]);