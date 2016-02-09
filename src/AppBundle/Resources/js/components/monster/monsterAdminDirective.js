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
                    mapmarkers: []
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
                    {name:"Nachts"},
                    {name:"Früh Morgens"},
                    {name:"Vormittags"},
                    {name:"Nachmittags"},
                    {name:"Abends"},
                    {name:"Spät Nachts"}
                ];

                var weatherTypes = [
                    {name:"Immer"},
                    {name:'Atomflocken'},
                    {name:'Bewölkt'},
                    {name:"Gewitter"},
                    {name:"Hitzewelle"},
                    {name:"Klar"},
                    {name:'Lichtpartikel'},
                    {name:'Magnetischer Sturm'},
                    {name:'Nebel'},
                    {name:'Polarlicht'},
                    {name:'Regen'},
                    {name:'Regenbogen'},
                    {name:'Rotes Polarlicht'},
                    {name:'Sandsturm'},
                    {name:'Schwefelregen'},
                    {name:'Sporen'},
                    {name:'Starker Regen'},
                    {name:'Sternschnuppen'}
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
                        orderBy: ['monster_type.prio', 'name'],
                        fields:[
                            {
                                label: 'Region',
                                name: 'region',
                                type: 'stringSelect',
                                data: regions,
                                fieldInfoTooltip: 'Standardwert: "Primordia"'
                            },
                            {
                                label: 'Level Min.',
                                name: 'level_min',
                                type: 'inputText',
                                fieldInfoTooltip: 'Nur Zahlen erlaubt.'
                            },
                            {
                                label: 'Level Max.',
                                name: 'level_max',
                                type: 'inputText',
                                fieldInfoTooltip: 'Nur Zahlen erlaubt. Leerlassen falls nur ein exaktes Level vorhanden.'
                            },
                            {
                                label: 'Zeit',
                                name: 'time',
                                type: 'falsableStringSelect',
                                data: times,
                                fieldInfoTooltip: 'Standardwert: "Immer"'
                            },
                            {
                                label: 'Wetter',
                                name: 'weather',
                                type: 'falsableStringSelect',
                                data: weatherTypes,
                                fieldInfoTooltip: 'Standardwert: "Immer"'
                            },
                            {
                                label: 'Tyrann?',
                                name: 'is_unique',
                                type: 'inputCheckbox'
                            },
                            {
                                label: 'Boss?',
                                name: 'is_story',
                                type: 'inputCheckbox',
                                fieldInfoTooltip: 'Handlungs- & Missionsgegner'
                            },
                            {
                                label: 'HP',
                                name: 'hp',
                                type: 'inputText',
                                fieldInfoTooltip: 'Text - Zahlenraum mit Minus angeben'
                            },
                            {
                                label: 'EP',
                                name: 'ep',
                                type: 'inputText',
                                fieldInfoTooltip: 'Text - Zahlenraum mit Minus angeben'
                            },
                            {
                                label: 'Resistenz - Physisch',
                                name: 'res_physic',
                                type: 'inputText',
                                fieldInfoTooltip: 'Nur Zahlen erlaubt, Standardwert 0'
                            },
                            {
                                label: 'Resistenz - Laser',
                                name: 'res_laser',
                                type: 'inputText',
                                fieldInfoTooltip: 'Nur Zahlen erlaubt, Standardwert 0'
                            },
                            {
                                label: 'Resistenz - Äther',
                                name: 'res_ether',
                                type: 'inputText',
                                fieldInfoTooltip: 'Nur Zahlen erlaubt, Standardwert 0'
                            },
                            {
                                label: 'Resistenz - Thermo',
                                name: 'res_thermo',
                                type: 'inputText',
                                fieldInfoTooltip: 'Nur Zahlen erlaubt, Standardwert 0'
                            },
                            {
                                label: 'Resistenz - Elektro',
                                name: 'res_electric',
                                type: 'inputText',
                                fieldInfoTooltip: 'Nur Zahlen erlaubt, Standardwert 0'
                            },
                            {
                                label: 'Resistenz - Gravit',
                                name: 'res_gravit',
                                type: 'inputText',
                                fieldInfoTooltip: 'Nur Zahlen erlaubt, Standardwert 0'
                            },
                            {
                                label: 'Aggression - Tag',
                                name: 'aggression_day',
                                type: 'stringSelect',
                                data: aggressionTypes,
                                fieldInfoTooltip: 'Standardwert: "Harmlos"'
                            },
                            {
                                label: 'Aggression im Skell - Tag',
                                name: 'agression_skell_day',
                                type: 'stringSelect',
                                data: aggressionTypes,
                                fieldInfoTooltip: 'Standardwert: "Harmlos"'
                            },
                            {
                                label: 'Aggression - Nacht',
                                name: 'agression_night',
                                type: 'stringSelect',
                                data: aggressionTypes,
                                fieldInfoTooltip: 'Standardwert: "Harmlos"'
                            },
                            {
                                label: 'Aggression im Skell - Nacht',
                                name: 'agression_skell_night',
                                type: 'stringSelect',
                                data: aggressionTypes,
                                fieldInfoTooltip: 'Standardwert: "Harmlos"'
                            },
                            {
                                label: 'Besonderheiten',
                                name: 'description',
                                type: 'textarea'
                            },
                            {
                                label: 'Ortsbeschreibung',
                                name: 'location_note',
                                type: 'textarea'
                            },
                            {
                                label: 'Kartenpunkte',
                                name: 'mapmarkers',
                                type: 'customMapmarkerInput',
                                data: $scope.maps
                            },
                            {
                                label: 'Gattung',
                                type: 'customMonsterMonsterTypeInput',
                                data: $scope.monsterTypes,
                                fieldInfoTooltip: 'Das Auswählen einer Gattung überschreibt die Materialien. Manchmal muss man außerhalb des Felds klicken, damit die Materialien eingefügt werden.'
                            },
                            {
                                label: 'Material',
                                name: 'materials',
                                type: 'customMaterialInput',
                                data: $scope.materials,
                                fieldInfoTooltip: 'Wähle eine Gattung aus, um die Materialien der Gattung hier zu erhalten, die dann angepasst werden können.'
                            }
                        ]
                    };
                };

                itemService.getMaterials(function(response){
                    $scope.materials = response;
                    materialDataLoaded = true;
                });

                monsterService.getMonsterTypesDetail(function(response){
                    $scope.monsterTypes = response;
                    monsterTypeDataLoaded = true;
                });

                mapService.getMaps(function(response){
                    $scope.maps = response;
                    mapDataLoaded = true;
                });

                monsterService.getMonstersDetail(function(response){
                   $scope.monsters = response;
                });

                $scope.updateMonster = function(monster) {
                    monsterService.updateMonster(monster);
                };

                $scope.addMonster = function(monster) {
                    if(monster) {
                        monsterService.addMonster(monster, function(){
                            monsterService.getMonstersDetail(function(response){
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