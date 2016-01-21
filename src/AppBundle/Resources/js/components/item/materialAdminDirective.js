'use strict';

angular.module('app')
    .directive('materialAdmin',['itemService', 'flashService', '$filter', function(itemService, flashService, $filter) {
        return {
            templateUrl:'js/components/material/materialAdminView.html',
            replace: true,
            link: function($scope, $element,$attrs){
                $scope.newItem = {};

                var rarities = [
                    {name:'Gewöhnlich'},
                    {name:'Wertvoll'},
                    {name:'Sehr wertvoll'},
                    {name:'Extrem wertvoll'},
                    {name:'Unbezahlbar'}
                ];

                var initFormModel = function() {
                    $scope.formModel = {
                        orderBy: ['name'],
                        fields:[
                            {
                                label: 'Seltenheit',
                                name: 'rarity',
                                type: 'editableStringSelect',
                                data: rarities,
                                fieldInfoTooltip: 'Wird auf "Gewöhnlich" gesetzt, wenn nichts gewählt.'
                            },
                            {
                                label: 'Verkaufswert',
                                name: 'credit_cost',
                                type: 'editableText',
                                fieldInfoTooltip: 'Nur Zahlen sind erlaubt.'
                            },
                            {
                                label: 'Belohnungstickets',
                                name: 'ticket_cost',
                                type: 'editableText',
                                fieldInfoTooltip: 'Nur Zahlen sind erlaubt.'
                            },
                            {
                                label: 'Körperteil',
                                name: 'body_part',
                                type: 'editableText'
                            },
                            {
                                label: 'Beschreibung',
                                name: 'description',
                                type: 'editableTextarea'
                            }
                        ]
                    };
                };

                initFormModel();

                itemService.getMaterials(function(response){
                    $scope.materials = response;
                });

                $scope.updateMaterial = function(material) {
                    itemService.updateMaterial(material);
                };

                $scope.addMaterial = function(material) {
                    if(material) {
                        itemService.addMaterial(material, function(){
                            itemService.getMaterials(function(response){
                                $scope.materials = response;
                            });
                            $scope.newItem = {};
                            flashService.clear();
                        });
                    } else {
                        flashService.error('Komplett leere Daten werden nicht angelegt.');
                    }
                };

                $scope.deleteMaterial = function(material) {
                    itemService.deleteMaterial(material.id, function(deletedMaterial){
                        $scope.deletedMaterial = deletedMaterial;
                        var index = $scope.materials.indexOf(material);
                        if(index !== -1) {
                            $scope.materials.splice(index,1);
                        }
                    });
                };

                $scope.addDeletedMaterial = function() {
                    $scope.addMaterial($scope.deletedMaterial);
                    $scope.deletedMaterial = null;
                };
            }
        }
    }]);