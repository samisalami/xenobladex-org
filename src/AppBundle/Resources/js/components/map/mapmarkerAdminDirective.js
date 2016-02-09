'use strict';

angular.module('app')
    .directive('mapmarkerAdmin',['mapmarkerService', 'mapService', 'personService', 'flashService', '$filter', function(mapmarkerService, mapService, personService, flashService, $filter) {
        return {
            templateUrl:'js/components/map/mapmarkerAdminView.html',
            replace: true,
            link: function($scope, $element,$attrs){
                $scope.currentMap = {};
                $scope.selectedMapId = null;
                $scope.newMapmarker = {
                    person: {
                        name: '',
                        id: null
                    }
                };

                var getPersons = function() {
                    personService.getPersons(function(response){
                        $scope.persons = response;
                    });
                };

                var getMapmarkersByMap = function() {
                    if($scope.currentMap.id) {
                        mapmarkerService.getMapmarkersByMap($scope.currentMap.id,function(response){
                            $scope.mapmarkers = response;
                        });
                    }
                };

                getPersons();

                mapService.getMaps(function(response){
                    $scope.maps = response;
                });

                $scope.selectMap = function(id){
                    $scope.currentMap = $filter('byId')($scope.maps, id);
                    getMapmarkersByMap();
                };

                $scope.updateMapmarker = function(mapmarker) {
                    mapmarkerService.updateMapmarker(mapmarker);
                };

                $scope.addMapmarker = function($event) {
                    if($scope.newMapmarker.person.name && $scope.currentMap) {
                        flashService.clear();
                        var offsetLeft = $($event.currentTarget).offset().left,
                            offsetTop = $($event.currentTarget).offset().top;

                        $scope.newMapmarker.y_coord = $event.pageY - offsetTop;
                        $scope.newMapmarker.x_coord = $event.pageX - offsetLeft;
                        $scope.newMapmarker.map = $scope.currentMap;

                        mapmarkerService.addMapmarker($scope.newMapmarker, 'PersonMapmarker', function(newMapmarker){
                            $scope.newMapmarker = newMapmarker;
                            getPersons();
                            getMapmarkersByMap();
                        });
                    } else {
                        flashService.error('Bitte wähle Person und Karte aus.');
                    }
                };

                $scope.deleteMapmarker = function(mapmarker) {
                    mapmarkerService.deleteMapmarker(mapmarker.id, function(deletedMapmarker){
                        $scope.deletedMapmarker = deletedMapmarker;
                        var index = $scope.mapmarkers.indexOf(mapmarker);
                        if(index !== -1) {
                            $scope.mapmarkers.splice(index,1);
                        }
                    });
                };

                $scope.addDeletedMapmarker = function() {
                    $scope.addMapmarker($scope.deletedMapmarker);
                    $scope.deletedMapmarker = null;
                };

                $scope.setZIndex = function($event) {
                    $('.mapmarker-wrapper').css('z-index', 10);
                    $($event.currentTarget).css('z-index', 11);
                };
            }
        }
    }]);