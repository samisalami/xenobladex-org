'use strict';

angular.module('app')
    .directive('monsterTypeAdmin',['monsterService', 'itemService', 'flashService', '$filter', function(monsterService, itemService, flashService, $filter) {
        return {
            templateUrl:'js/components/monster/monsterTypeAdminView.html',
            replace: true,
            link: function($scope, $element,$attrs){
                $scope.newMonsterType = {
                    materials: [
                    ]
                };

                var initFormModel = function() {
                    $scope.formModel = {
                        orderBy: ['prio', 'name'],
                        fields:[
                            {
                                label: 'Beschreibung',
                                name: 'description',
                                type: 'textarea',
                                fieldInfoTooltip: 'Gibt es nur, falls wir in Zukunft noch Extra Infos zur Gattung erfassen wollen.'
                            },
                            {
                                label: 'Material',
                                name: 'materials',
                                type: 'customMaterialInput',
                                data: $scope.materials,
                                fieldInfoTooltip: 'In erster Zeile neues Material (muss nicht existieren) verknüpfen dann "Hinzufügen" wählen -> Änderungen werden via Häkchen oder bei neuer Gattung via "Hinzufügen" permanent gespeichert'
                            },
                            {
                                label: 'Sortierung',
                                name: 'prio',
                                type: 'inputText',
                                fieldInfoTooltip: 'Nur Zahlen erlaubt. Sortierung ist aufsteigend (am besten Spielraum zwischen den Zahlen lassen)'
                            }
                        ]
                    };
                };

                var getMonsterTypes = function() {
                    monsterService.getMonsterTypes(function(response){
                        $scope.monsterTypes = response;
                    }, 'monsterTypeDetail');
                };

                itemService.getMaterials(function(response){
                    $scope.materials = response;
                    initFormModel();
                });

                getMonsterTypes();

                $scope.updateMonsterType = function(monsterType) {
                    monsterService.updateMonsterType(monsterType);
                };

                $scope.addMonsterType = function(monsterType) {
                    if(monsterType) {
                        monsterService.addMonsterType(monsterType, function(){
                            getMonsterTypes();
                            $scope.newMonsterType = {
                                materials: [
                                ]
                            };
                            flashService.clear();
                        });
                    } else {
                        flashService.error('Komplett leere Daten werden nicht angelegt.');
                    }
                };

                $scope.deleteMonsterType = function(monsterType) {
                    monsterService.deleteMonsterType(monsterType.id, function(deletedMonsterType){
                        $scope.deletedMonsterType = deletedMonsterType;
                        var index = $scope.monsterTypes.indexOf(monsterType);
                        if(index !== -1) {
                            $scope.monsterTypes.splice(index,1);
                        }
                    });
                };

                $scope.addDeletedMonsterType = function() {
                    $scope.addMonsterType($scope.deletedMonsterType);
                    $scope.deletedMonsterType = null;
                };
            }
        }
    }]);