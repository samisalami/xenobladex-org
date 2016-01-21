angular.module('app')
    .directive('personMissingData',['personService', 'mapmarkerService', function(personService, mapmarkerService) {
        return {
            restrict: 'E',
            templateUrl: 'js/components/person/personMissingDataView.html',
            replace: true,
            link: function($scope, $element,$attrs) {
                var personDataLoaded = false;
                var mapmarkerDataLoaded = false;

                $scope.dataLoaded = function(){
                    return personDataLoaded && mapmarkerDataLoaded;
                };

                mapmarkerService.getMapmarkers('PersonMapmarker',function (response) {
                    $scope.mapmarkers = response;
                    mapmarkerDataLoaded = true;
                });

                personService.getPersons(function(response){
                    $scope.persons = response;
                    personDataLoaded = true;
                });

                $scope.$watch($scope.dataLoaded, function(dataLoaded){
                    if(dataLoaded) {
                        $scope.combinedPersons = [];
                        var pcount = $scope.persons.length;
                        var mcount = $scope.mapmarkers.length;
                        for (var i=0; i<pcount; i++) {
                            $scope.combinedPersons[i] = $scope.persons[i];
                            $scope.combinedPersons[i]['hasMapmarker'] = false;
                            for(var x=0;x<mcount;x++) {
                                if($scope.mapmarkers[x]['person']['id'] == $scope.persons[i]['id']) {
                                    $scope.combinedPersons[i]['hasMapmarker'] = true;
                                    break;
                                }
                            }
                        }
                    }
                });
            }
        }
    }]);