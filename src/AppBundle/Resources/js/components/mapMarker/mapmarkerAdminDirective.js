'use strict';

angular.module('app')
    .directive('mapmarkerAdmin',['mapmarkerService', 'mapService', 'personService', 'flashService', '$filter', function(mapmarkerService, mapService, personService, flashService, $filter) {
        return {
            templateUrl:'templates/mapmarkerAdminView.html',
            replace: true,
            link: function($scope, $element,$attrs){
                $scope.currentMap = {};
                $scope.currentMap.id = null;
                $scope.newMapmarker = {};
                $scope.selectedMapId = null;

                $scope.selectMap = function(id){
                    $scope.currentMap = $filter('filter')($scope.maps, {id: id})[0];
                };

                mapService.getMaps(function(response){
                    $scope.maps = response;
                });

                personService.getPersons(function(response){
                    $scope.persons = response;
                });

                var getMapmarkersByPerson = function(id) {
                    mapmarkerService.getMapmarkersByPerson(id,function(response){
                        $scope.mapmarkers = response;
                    });
                };

                var showMapmarkers = function(mapmarkers) {

                };

                $scope.updateMapmarker = function(mapmarker) {
                    mapmarkerService.updateMapmarker(mapmarker);
                };

                $scope.addMapmarker = function($event) {
                    var offsetLeft = $($event.currentTarget).offset().left,
                        offsetTop = $($event.currentTarget).offset().top;

                    $scope.newMapmarker.y_coord = $event.pageY - offsetTop;
                    $scope.newMapmarker.x_coord = $event.pageX - offsetLeft;
                    $scope.newMapmarker.map = $scope.currentMap;

                    mapmarkerService.addMapmarker($scope.newMapmarker, function(){
                        mapmarkerService.getMapmarkersByPerson($scope.newMapmarker.person.id, function(response){
                            $scope.mapmarkers = response;
                        });
                    });

                    //if(mapmarker) {
                    //    mapmarkerService.addMapmarker(mapmarker, function(){
                    //        mapmarkerService.getMapmarkers(function(response){
                    //            $scope.mapmarkers = response;
                    //        });
                    //        $scope.newMapmarker = {};
                    //        flashService.clear();
                    //    });
                    //} else {
                    //    flashService.error('Komplett leere Daten werden nicht angelegt.');
                    //}
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
                    getMapmarkersByPerson(person.id);
                };

                $scope.log = function(value) {
                    console.log(value);
                };
            }
        }
    }]);