'use strict';

angular.module('app')
    .directive('monsterAdmin',['monsterService', 'itemService', 'mapService', 'flashService', '$filter', function(monsterService, itemService, mapService, flashService, $filter) {
        return {
            templateUrl:'js/components/monster/monsterAdminView.html',
            replace: true,
            link: function($scope, $element,$attrs){
                var monsterTypeDataLoaded = false;
                var materialDataLoaded = false;
                var mapDataLoaded = false;
                $scope.newMonster = {
                    materials: [],
                    monster_type: {
                        materials: []
                    }
                };

                var regions = [
                    {name:'NLA'},
                    {name:'Primordia'},
                    {name:'Noctilum'},
                    {name:'Oblivia'},
                    {name:'Sylvalum'},
                    {name:'Cauldros'}
                ];

                var times = [
                    {name:"Immer"},
                    {name:"Tagsüber"},
                    {name:"Nachts"}
                ];

                var weatherTypes = [
                    {name:"Immer"},
                    {name:"Klar"},
                    {name:'Bewölkt'},
                    {name:'Nebel'},
                    {name:'Regen'},
                    {name:'Regenbogen'},
                    {name:'Starker Regen'},
                    {name:"Gewitter"},
                    {name:'Sandsturm'},
                    {name:'Lichtpartikel'},
                    {name:'Polarlicht'},
                    {name:'Rotes Polarlicht'},
                    {name:'Atomflocken'},
                    {name:'Sporen'},
                    {name:'Schwefelregen'}
                ];

                var aggressionTypes = [
                    {name:"Harmlos"},
                    {name:"Visuell"},
                    {name:'Auditiv'},
                    {name:'Visuell, Auditiv'}
                ];

                $scope.dataLoaded = function(){
                    return monsterTypeDataLoaded && materialDataLoaded && mapDataLoaded;
                };

                $scope.$watch($scope.dataLoaded, function(dataLoaded){
                    if(dataLoaded && !$scope.formModel) {
                        initFormModel();
                    }
                });

                var initFormModel = function() {
                    $scope.formModel = {
                        orderBy: ['monster_type.name', 'name'],
                        fields:[
                            {
                                label: 'Region',
                                name: 'region',
                                type: 'editableStringSelect',
                                data: regions
                            },
                            {
                                label: 'Level Min.',
                                name: 'level_min',
                                type: 'editableText',
                                fieldInfoTooltip: 'Nur Zahlen erlaubt.'
                            },
                            {
                                label: 'Level Max.',
                                name: 'level_max',
                                type: 'editableText',
                                fieldInfoTooltip: 'Nur Zahlen erlaubt. Leerlassen falls nur ein exaktes Level vorhanden.'
                            },
                            {
                                label: 'Zeit',
                                name: 'time',
                                type: 'editableStringSelect',
                                data: times,
                                fieldInfoTooltip: 'Standardwert: "Immer"'
                            },
                            {
                                label: 'Wetter',
                                name: 'weather',
                                type: 'editableStringSelect',
                                data: weatherTypes,
                                fieldInfoTooltip: 'Standardwert: "Immer"'
                            },
                            {
                                label: 'Tyrann?',
                                name: 'is_unique',
                                type: 'inputCheckbox'
                            },
                            {
                                label: 'EP',
                                name: 'ep',
                                type: 'editableText'
                            },
                            {
                                label: 'Aggression - Tag',
                                name: 'aggression_day',
                                type: 'editableStringSelect',
                                data: aggressionTypes,
                                fieldInfoTooltip: 'Standardwert: "Harmlos"'
                            },
                            {
                                label: 'Aggression im Skell - Tag',
                                name: 'agression_skell_day',
                                type: 'editableStringSelect',
                                data: aggressionTypes,
                                fieldInfoTooltip: 'Standardwert: "Harmlos"'
                            },
                            {
                                label: 'Aggression - Nacht',
                                name: 'agression_night',
                                type: 'editableStringSelect',
                                data: aggressionTypes,
                                fieldInfoTooltip: 'Standardwert: "Harmlos"'
                            },
                            {
                                label: 'Aggression im Skell - Nacht',
                                name: 'agression_skell_night',
                                type: 'editableStringSelect',
                                data: aggressionTypes,
                                fieldInfoTooltip: 'Standardwert: "Harmlos"'
                            },
                            {
                                label: 'Besonderheiten',
                                name: 'description',
                                type: 'editableTextarea'
                            },
                            {
                                label: 'Ortsbeschreibung',
                                name: 'location_note',
                                type: 'editableTextarea'
                            },
                            {
                                label: 'Kartenpunkte',
                                name: 'mapmarkers',
                                type: 'customMapmarkerInput',
                                data: $scope.maps
                            },
                            {
                                label: 'Gattung',
                                name: 'materials',
                                type: 'customMonsterMaterialInput',
                                data: $scope.monsterTypes,
                                fieldInfoTooltip: 'In erster Zeile neues Material (muss nicht existieren) verknüpfen dann "Hinzufügen" wählen -> Änderungen werden via Häkchen oder bei neuer Gattung via "Hinzufügen" permanent gespeichert'
                            }
                        ]
                    };
                };

                itemService.getMaterials(function(response){
                    $scope.materials = response;
                    materialDataLoaded = true;
                });

                monsterService.getMonsterTypes(function(response){
                    $scope.monsterTypes = response;
                    monsterTypeDataLoaded = true;
                });

                mapService.getMaps(function(response){
                    $scope.maps = response;
                    mapDataLoaded = true;
                });

                monsterService.getMonsters(function(response){
                   $scope.monsters = response;
                });

                $scope.updateMonster = function(monster) {
                    monsterService.updateMonster(monster);
                };

                $scope.addMonster = function(monster) {
                    if(monster) {
                        monsterService.addMonster(monster, function(){
                            monsterService.getMonsters(function(response){
                                $scope.monsters = response;
                            });
                            $scope.newMonster = {
                                materials: [
                                ]
                            };
                            flashService.clear();
                        });
                    } else {
                        flashService.error('Komplett leere Daten werden nicht angelegt.');
                    }
                };

                $scope.deleteMonster = function(monster) {
                    monsterService.deleteMonster(monster.id, function(deletedMonster){
                        $scope.deletedMonster = deletedMonster;
                        var index = $scope.monsters.indexOf(monster);
                        if(index !== -1) {
                            $scope.monsters.splice(index,1);
                        }
                    });
                };

                $scope.addDeletedMonster = function() {
                    $scope.addMonster($scope.deletedMonster);
                    $scope.deletedMonster = null;
                };
            }
        }
    }]);