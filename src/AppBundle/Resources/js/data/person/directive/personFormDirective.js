'use strict';

angular.module('app')
    .directive('personForm',['PersonService', 'RegionService', 'SpeciesService', function(PersonService, RegionService, SpeciesService) {
        return {
            restrict: 'E',
            replace: false,
            templateUrl: 'js/data/person/directive/personFormView.html',
            scope: {
                personSealed: "=person",
                addForm: "@"
            },
            controller: ['$scope',function($scope) {
                var that = this;
                init();

                function init() {
                    setFormPerson($scope.personSealed);
                    setRegions(RegionService.Regions);
                    setSpecies(SpeciesService.Species);
                }

                function setRegions(regions) {
                    that.regions = regions;
                }

                function setSpecies(species) {
                    that.species = species;
                }

                function setFormPerson(person) {
                    that.person = $.extend({}, person, true);
                }

                that.deletePerson = function() {
                    PersonService.deletePerson(that.person);
                };

                that.updatePerson = function() {
                    if(that.person.id) {
                        PersonService.updatePerson(that.person);
                    } else {
                        PersonService.addPerson(that.person);
                        setFormPerson($scope.personSealed);
                    }
                }
            }],
            controllerAs: 'form'
        }
    }]);