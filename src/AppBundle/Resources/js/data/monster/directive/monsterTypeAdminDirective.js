'use strict';

angular.module('app')
    .directive('monsterTypeAdmin',['monsterService', 'itemService', 'flashService', '$filter', function(monsterService, itemService, flashService, $filter) {
        return {
            restrict: 'E',
            replace: true,
            controller: ['$scope',function($scope) {
                var that = this;
                init();

                function init() {
                    MonsterTypeService.onMonsterTypesChanged(setMonsterTypes);
                    MonsterTypeService.onMonsterTypeDeleted(setDeletedMonsterType);
                    setMonsterTypes(MonsterTypeService.getMonsterTypes());

                    that.newMonsterType = MonsterTypeService.MonsterType;
                }

                function setMonsterTypes(monsterTypes) {
                    that.monsterTypes = monsterTypes;
                }

                function setDeletedMonsterType(monsterType) {
                    that.deletedMonsterType = monsterType;
                    delete that.deletedMonsterType.id;
                }

                that.addDeletedMonsterType = function() {
                    MonsterTypeService.addMonsterType(that.deletedMonsterType);
                    delete that.deletedMonsterType;
                };
            }],
            controllerAs: 'vm',
            link: function($scope, $element,$attrs){
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
            }
        }
    }]);