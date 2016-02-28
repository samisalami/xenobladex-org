'use strict';

angular.module('app')
    .directive('materialAdmin',['itemService', 'flashService', '$filter', function(itemService, flashService, $filter) {
        return {
            templateUrl:'js/data/item/materialAdminView.html',
            replace: true,
            link: function($scope, $element,$attrs){
                $scope.newMaterial = {};

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
                                type: 'stringSelect',
                                data: rarities,
                                fieldInfoTooltip: 'Wird auf "Gewöhnlich" gesetzt, wenn nichts gewählt.'
                            },
                            {
                                label: 'Verkaufswert',
                                name: 'credit_cost',
                                type: 'inputText',
                                fieldInfoTooltip: 'Nur Zahlen sind erlaubt.'
                            },
                            {
                                label: 'Belohnungstickets',
                                name: 'ticket_cost',
                                type: 'inputText',
                                fieldInfoTooltip: 'Nur Zahlen sind erlaubt.'
                            },
                            {
                                label: 'Körperteil',
                                name: 'body_part',
                                type: 'inputText'
                            },
                            {
                                label: 'Kann nicht mit Tickets gekauft werden?',
                                name: 'is_not_buyable',
                                type: 'inputCheckbox'
                            },
                            {
                                label: 'Arten anzeigen statt Gattungen?',
                                name: 'show_monsters',
                                type: 'inputCheckbox'
                            }
                            //not needed for now
                            //{
                            //    label: 'Beschreibung',
                            //    name: 'description',
                            //    type: 'editableTextarea'
                            //}
                        ]
                    };
                };

                var getMaterials = function() {
                    itemService.getMaterials(function(response){
                        $scope.materials = response;
                    }, 'itemDetail');
                };

                getMaterials();
                initFormModel();

                $scope.updateMaterial = function(material) {
                    itemService.updateMaterial(material);
                };

                $scope.addMaterial = function(material) {
                    if(material) {
                        itemService.addMaterial(material, function(){
                            getMaterials();
                            $scope.newMaterial = {};
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