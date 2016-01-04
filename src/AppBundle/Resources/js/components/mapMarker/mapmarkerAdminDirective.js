'use strict';

angular.module('app')
    .directive('mapmarkerAdmin',['mapmarkerService', 'mapService', 'personService', 'flashService', '$filter', function(mapmarkerService, mapService, personService, flashService, $filter) {
        return {
            templateUrl:'templates/mapmarkerAdminView.html',
            replace: true,
            link: function($scope, $element,$attrs){
                $scope.currentMap = {};
                $scope.selectedMapId = null;
                $scope.newMapmarker = {};

                $scope.selectMap = function(id){
                    $scope.currentMap = $filter('filter')($scope.maps, {id: id})[0];
                    getRelatedMapmarkers();
                };

                mapService.getMaps(function(response){
                    $scope.maps = response;
                });

                personService.getPersons(function(response){
                    $scope.persons = response;
                });

                var getRelatedMapmarkers = function() {
                    if($scope.currentMap.id) {
                        mapmarkerService.getMapmarkersByMap($scope.currentMap.id,function(response){
                            if($scope.newMapmarker.person) {
                                $scope.mapmarkers = $filter('filter')(response, {person:{id: $scope.newMapmarker.person.id}});
                            } else {
                                //TODO: show only mapmarkers belonging to persons
                                $scope.mapmarkers = response;
                            }
                        });
                    }
                };

                $scope.updateMapmarker = function(mapmarker) {
                    mapmarkerService.updateMapmarker(mapmarker);
                };

                $scope.addMapmarker = function($event) {
                    if($scope.newMapmarker.person && $scope.currentMap) {
                        flashService.clear();
                        var offsetLeft = $($event.currentTarget).offset().left,
                            offsetTop = $($event.currentTarget).offset().top;

                        $scope.newMapmarker.y_coord = $event.pageY - offsetTop;
                        $scope.newMapmarker.x_coord = $event.pageX - offsetLeft;
                        $scope.newMapmarker.map = $scope.currentMap;

                        mapmarkerService.addMapmarker($scope.newMapmarker, 'PersonMapmarker', function(){
                            mapmarkerService.getMapmarkersByPerson($scope.newMapmarker.person.id, function(response){
                                $scope.mapmarkers = response;
                            });
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

                $scope.selectPerson = function(person) {
                    $scope.currentMapmarkers = $filter('filter')($scope.mapmarkers, {person: person});
                    $scope.newMapmarker.person = person;
                    getRelatedMapmarkers();
                    $('.collapse','.detail-select-overlay').removeClass('in');
                };

                $scope.log = function(value) {
                    console.log(value);
                };

                $scope.setZIndex = function($event) {
                    $('.mapmarker-wrapper').css('z-index', 10);
                    $($event.currentTarget).css('z-index', 11);
                };
            }
        }
    }]);