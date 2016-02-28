'use strict';

angular.module('app')
    .directive('missionAdmin',['MissionService', 'MissionTypeService','SideJobTypeService', 'personService', 'mapService', 'flashService', '$filter', function(MissionService, MissionTypeService, RegionService, personService, mapService, flashService, $filter) {
        return {
            restrict: 'E',
            //templateUrl:'js/components/mission/missionAdminView.html',
            replace: true,
            controller: function() {
                var that = this;
                init();

                function init() {
                    MissionService.onMissionsChanged(setMissions);
                    setMissions(MissionService.getMissions());

                    that.newMission = MissionService.Mission;
                }

                function setMissions(missions) {
                    that.missions = missions;
                }


                //that.updateItem = function(mission) {
                //    MissionService.updateMission(mission);
                //    if(mission.person) {
                //        personService.getPersons(function(response) {
                //            $scope.persons = response;
                //        });
                //    }
                //};

                //that.addItem = function(mission) {
                //    if(mission) {
                //        MissionService.addMission(mission, function(){
                //            getMissions();
                //            $scope.newMission = {};
                //            flashService.clear();
                //        });
                //    } else {
                //        flashService.error('Komplett leere Daten werden nicht angelegt.');
                //    }
                //};
                //
                //that.deleteItem = function(mission) {
                //    MissionService.deleteMission(mission.id, function(deletedMission){
                //        $scope.deletedMission = deletedMission;
                //        var index = $scope.missions.indexOf(mission);
                //        if(index !== -1) {
                //            $scope.missions.splice(index,1);
                //        }
                //    });
                //};
                //
                //that.addDeletedItem = function() {
                //    $scope.addMission($scope.deletedMission);
                //    $scope.deletedMission = null;
                //};
            },
            controllerAs: 'vm',
            link: function($scope, $element,$attrs){
                //$scope.newMission = {
                //    mapmarkers: []
                //};
                //var personDataLoaded = false;
                //var missionTypesDataLoaded = false;
                //var mapDataLoaded = false;
                //
                //var sidejobTypes = [
                //    {name:'Suche'},
                //    {name:'Jagd'},
                //    {name:'Gespräch'}
                //];
                //
                //var regions = [
                //    {name:'BLADE-Quartier'},
                //    {name:'Industriegebiet'},
                //    {name:'Verwaltungsbezirk'},
                //    {name:'Wohnviertel'},
                //    {name:'Geschäftsviertel'},
                //    {name:'Ma-non-Schiff'},
                //    {name:'Primordia'},
                //    {name:'Noctilum'},
                //    {name:'Oblivia'},
                //    {name:'Sylvalum'},
                //    {name:'Cauldros'}
                //];
                //
                //$scope.dataLoaded = function(){
                //    return personDataLoaded && missionTypesDataLoaded && mapDataLoaded;
                //};
                //
                //$scope.$watch($scope.dataLoaded, function(dataLoaded){
                //   if(dataLoaded && !$scope.formModel) {
                //       initFormModel();
                //   }
                //});
                //
                //var initFormModel = function() {
                //    $scope.formModel = {
                //        orderBy: 'name',
                //        fields: [
                //            {
                //                label: 'Richtige Person?',
                //                name: 'has_person',
                //                type: 'inputCheckbox'
                //            },
                //            {
                //                show: 'has_person',
                //                showValue: true,
                //                label: 'Auftraggeber',
                //                name: 'person',
                //                type: 'customAutoCompleteSelect',
                //                data: $scope.persons
                //            },
                //            {
                //                hide: 'has_person',
                //                hideValue: false,
                //                label: 'Auftraggeber',
                //                name: 'person_unrelated',
                //                type: 'inputText'
                //            },
                //            {
                //                label: 'Bedingung - BLADE-Level',
                //                name: 'blade_level',
                //                type: 'inputText',
                //                fieldInfoTooltip: 'Nur Zahlen erlaubt.'
                //            },
                //            {
                //                label: 'Bedingung - Kapitel',
                //                name: 'chapter',
                //                type: 'inputText',
                //                fieldInfoTooltip: 'Nur Zahlen erlaubt.'
                //            },
                //            {
                //                label: 'Bedingungen',
                //                name: 'conditions',
                //                type: 'textarea'
                //            },
                //            {
                //                label: 'Erhalt wo?',
                //                name: 'location_note',
                //                type: 'textarea'
                //            },
                //            {
                //                label: 'Nebenjob-Zielregion',
                //                name: 'target_area',
                //                type: 'stringSelect',
                //                data: regions
                //            },
                //            {
                //                label: 'Nebenjob-Typ',
                //                name: 'sidejob_type',
                //                type: 'stringSelect',
                //                data: sidejobTypes
                //            },
                //            {
                //                label: 'Beschreibung',
                //                name: 'description',
                //                type: 'textarea'
                //            },
                //            {
                //                label: 'Aufgaben',
                //                name: 'tasks',
                //                type: 'textarea'
                //            },
                //            {
                //                label: 'Lösung',
                //                name: 'solution',
                //                type: 'textarea'
                //            },
                //            {
                //                label: 'Belohnung',
                //                name: 'rewards',
                //                type: 'textarea'
                //            },
                //            {
                //                label: 'Nebenjob-Schwierigkeit',
                //                name: 'difficulty',
                //                type: 'inputText',
                //                fieldInfoTooltip: 'Nur Zahlen erlaubt (kleine Sterne addieren).'
                //            },
                //            {
                //                label: 'Typ',
                //                name: 'mission_type',
                //                type: 'objectSelect',
                //                data: $scope.missionTypes
                //            }
                //            //{
                //            //    label: 'Karte',
                //            //    name: 'mapmarkers',
                //            //    type: 'customMapmarkerInput',
                //            //    data: $scope.maps
                //            //}
                //        ]
                //    };
                //};


                //
                //mapService.getMaps(function(response){
                //    $scope.maps = response;
                //    mapDataLoaded = true;
                //});


            }
        }
    }]);