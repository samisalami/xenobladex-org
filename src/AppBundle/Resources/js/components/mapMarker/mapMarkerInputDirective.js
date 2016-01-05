'use strict';

angular.module('app')
    .directive('mapMarkerInput',['mapmarkerService', '$filter', '$timeout',function(mapMarkerService, $filter, $timeout) {
        return {
            restrict: 'EA',
            templateUrl:'templates/mapmarkerInputView.html',
            replace: true,
            scope: {
                mapmarkers: '=',
                maps: '='
            },
            link: function($scope, element, attrs) {
                $scope.shownMapmarkers = {};
                $scope.currentMap = {};
                $scope.selectedMapId = null;
                $scope.contentId = 'map-marker-input-'+Date.now();

                var getRelatedMapmarkers = function() {
                    $scope.shownMapmarkers = $filter('filter')($scope.mapmarkers, {map:{id:$scope.currentMap.id}});
                };

                $scope.selectMap = function(id){
                    $scope.currentMap = $filter('filter')($scope.maps, {id: id})[0];
                    getRelatedMapmarkers();
                };

                $scope.addMapmarker = function($event) {
                    var mapmarker = {};
                    var offsetLeft = $($event.currentTarget).offset().left,
                        offsetTop = $($event.currentTarget).offset().top;

                    mapmarker.y_coord = $event.pageY - offsetTop;
                    mapmarker.x_coord = $event.pageX - offsetLeft;
                    mapmarker.map = $scope.currentMap;
                    $scope.mapmarkers = $scope.mapmarkers.concat(mapmarker);
                    getRelatedMapmarkers();
                };

                $scope.deleteMapmarker = function(mapmarker) {
                    var index = $scope.mapmarkers.indexOf(mapmarker);
                    if(index !== -1) {
                        $scope.mapmarkers.splice(index,1);
                    }
                    getRelatedMapmarkers();
                };

                $scope.setZIndex = function($event) {
                    $('.mapmarker-wrapper').css('z-index', 10);
                    $($event.currentTarget).css('z-index', 11);
                };
            }
        }
    }]);