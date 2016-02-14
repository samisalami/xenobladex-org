'use strict';

angular.module('app')
    .directive('collectibleAdmin',['itemService', 'flashService', '$filter', function(itemService, flashService, $filter) {
        return {
            templateUrl:'js/components/item/collectibleAdminView.html',
            replace: true,
            link: function($scope, $element,$attrs){
                $scope.newCollectible = {};

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
                                label: 'Beschreibung',
                                name: 'description',
                                type: 'textarea'
                            },
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
                                label: 'Ortsbeschreibung',
                                name: 'location_note',
                                type: 'textarea'
                            }
                        ]
                    };
                };

                var getCollectibles = function() {
                    itemService.getCollectibles(function(response){
                        $scope.collectibles = response;
                    });
                };

                getCollectibles();
                initFormModel();

                $scope.updateCollectible = function(collectible) {
                    itemService.updateCollectible(collectible);
                };

                $scope.addCollectible = function(collectible) {
                    if(collectible) {
                        itemService.addCollectible(collectible, function(){
                            getCollectibles();
                            $scope.newCollectible = {};
                            flashService.clear();
                        });
                    } else {
                        flashService.error('Komplett leere Daten werden nicht angelegt.');
                    }
                };

                $scope.deleteCollectible = function(collectible) {
                    itemService.deleteCollectible(collectible.id, function(deletedCollectible){
                        $scope.deletedCollectible = deletedCollectible;
                        var index = $scope.collectibles.indexOf(collectible);
                        if(index !== -1) {
                            $scope.collectibles.splice(index,1);
                        }
                    });
                };

                $scope.addDeletedCollectible = function() {
                    $scope.addCollectible($scope.deletedCollectible);
                    $scope.deletedCollectible = null;
                };
            }
        }
    }]);