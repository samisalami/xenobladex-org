'use strict';

angular.module('app')
    .directive('monsterTypeAdmin',['monsterService', 'itemService', 'flashService', '$filter', function(monsterService, itemService, flashService, $filter) {
        return {
            templateUrl:'templates/monsterTypeAdminView.html',
            replace: true,
            link: function($scope, $element,$attrs){
                $scope.newMonsterType = {
                    materials: [
                        {
                            name: '',
                            id: null
                        }
                    ]
                };

                var initFormModel = function() {
                    $scope.formModel = {
                        orderBy: ['name'],
                        fields:[
                            {
                                label: 'Beschreibung',
                                name: 'description',
                                type: 'editableTextarea',
                                fieldInfoTooltip: 'Gibt es nur, falls wir in Zukunft noch Extra Infos zur Gattung erfassen wollen.'
                            },
                            //{
                            //    label: 'Material',
                            //    name: 'materials',
                            //    type: 'customMaterialInput',
                            //    data: $scope.materials
                            //}
                        ]
                    };
                };

                itemService.getMaterials(function(response){
                    $scope.materials = response;
                    initFormModel();
                });

                monsterService.getMonsterTypes(function(response){
                    $scope.monsterTypes = response;
                });

                $scope.updateMonsterType = function(monsterType) {
                    monsterService.updateMonsterType(monsterType);
                };

                $scope.addMonsterType = function(monsterType) {
                    if(monsterType) {
                        monsterService.addMonsterType(monsterType, function(){
                            monsterService.getMonsterTypes(function(response){
                                $scope.monsterTypes = response;
                            });
                            $scope.newMonsterType = {};
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