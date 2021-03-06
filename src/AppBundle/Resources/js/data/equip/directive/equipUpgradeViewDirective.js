'use strict';

angular.module('app')
    .directive('equipUpgradeView',['EquipUpgradeService','EquipUpgradeTierService','$filter', '$timeout', '$location', '$anchorScroll', '$routeParams', function(EquipUpgradeService, EquipUpgradeTierService, $filter, $timeout, $location, $anchorScroll, $routeParams) {
        return {
            restrict: 'E',
            controller: ['$scope',function($scope) {
                var that = this;
                that.scrolled = false;
                that.equipUpgrades = [];
                that.equipUpgradeTiers = [];
                init();

                function init() {
                    EquipUpgradeService.onEquipUpgradesChanged(setEquipUpgrades);
                    setEquipUpgrades(EquipUpgradeService.getEquipUpgrades());
                    EquipUpgradeTierService.onEquipUpgradeTiersChanged(setEquipUpgradeTiers);
                    setEquipUpgradeTiers(EquipUpgradeTierService.getEquipUpgradeTiers());
                }

                function setEquipUpgradeTiers(equipUpgradeTiers) {
                    that.equipUpgradeTiers = equipUpgradeTiers;
                    setViewData();
                }

                function setEquipUpgrades(equipUpgrades) {
                    that.equipUpgrades = equipUpgrades;
                    setViewData();
                }

                function setViewData() {
                    if(that.equipUpgrades && that.equipUpgradeTiers) {
                        var type = $routeParams['type'];

                        if(type) {
                            that.equipUpgrades = $.map(that.equipUpgrades, function(item, i){
                                if(item.category_type) {
                                    if(item.category_type.toLowerCase() == type) {
                                        return item;
                                    }
                                }

                                return null;
                            });
                        }

                        $scope.groupedEquipUpgrades = $filter('groupByFilter')(that.equipUpgrades, 'category_name');
                        $scope.equipUpgradeTiers = that.equipUpgradeTiers;

                        var promise = $timeout(function(){
                            if($location.hash() && !that.scrolled) {
                                that.scrolled = true;
                                $anchorScroll();
                            }
                            $timeout.cancel(promise);
                        },0);
                    }
                }

                $scope.nameQuery = '';

                $scope.filterNames = function(equipUpgrade) {
                    if(!$scope.nameQuery) {
                        return true;
                    }

                    return equipUpgrade.name.toLowerCase().indexOf($scope.nameQuery.toLowerCase()) != -1 || equipUpgrade.alternative_name.toLowerCase().indexOf($scope.nameQuery.toLowerCase()) != -1;
                };

                $scope.getEquipUpgradeTierMaterial = function(equipUpgrade, equipUpgradeTier, i) {
                    if(equipUpgradeTier.material_individual) {
                        return equipUpgradeTier['material'+i];
                    }

                    if (equipUpgradeTier.name == 'I' || equipUpgradeTier.name == 'V') {
                        return equipUpgrade['material_small'+i];
                    }

                    return equipUpgrade['material_large'+i];
                };
            }]
        }
    }]);