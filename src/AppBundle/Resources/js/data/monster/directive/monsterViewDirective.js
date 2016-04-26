'use strict';

angular.module('app')
    .directive('monsterView',['MonsterService','MonsterTypeService','$filter', '$timeout', '$location', '$anchorScroll', '$routeParams', function(MonsterService, MonsterTypeService, $filter, $timeout, $location, $anchorScroll, $routeParams) {
        return {
            restrict: 'E',
            controller: ['$scope',function($scope) {
                var that = this;
                that.scrolled = false;
                that.monsters = [];
                that.monsterTypes = [];
                init();

                function init() {
                    MonsterService.onMonstersChanged(setMonsters);
                    setMonsters(MonsterService.getMonsters());
                    MonsterTypeService.onMonsterTypesChanged(setMonsterTypes);
                    setMonsterTypes(MonsterTypeService.getMonsterTypes());
                }

                function setMonsterTypes(monsterTypes) {
                    that.monsterTypes = monsterTypes;
                    setViewData();
                }

                function setMonsters(monsters) {
                    that.monsters = monsters;
                    setViewData();
                }

                function setViewData() {
                    if(that.monsters && that.monsterTypes) {
                        var monsters = [];

                        var mLength = that.monsters.length;
                        for(var i = 0; i < mLength; i++) {
                            var monster = $.extend({}, that.monsters[i], true);

                            if($.isNumeric(monster.monster_type)) {
                                monster.monster_type = $filter('byId')(that.monsterTypes, monster.monster_type) || null;
                            }

                            switch (monster.region) {
                                case "Primordia":
                                    monster.regionIndex = 1;
                                    break;
                                case "Noctilum":
                                    monster.regionIndex = 2;
                                    break;
                                case "Oblivia":
                                    monster.regionIndex = 3;
                                    break;
                                case "Sylvalum":
                                    monster.regionIndex = 4;
                                    break;
                                case "Cauldros":
                                    monster.regionIndex = 5;
                                    break;
                                default:
                                    monster.regionIndex = 6;
                                    break;
                            }

                            monsters.push(monster);
                        }

                        var usual_monsters = $filter('filter')(monsters, {is_story:false, is_unique:false, region:region});
                        var story_monsters = $filter('filter')(monsters, {is_story:true, region: region});
                        var unique_monsters = $filter('filter')(monsters, {is_unique:true, region: region});

                        var groupedByTypeMonsters = [{
                            name: 'Tyrannen',
                            data: unique_monsters
                        }, {
                            name: 'Handlungsgegner',
                            data: story_monsters
                        }, {
                            name: 'Kreaturen',
                            data: usual_monsters
                        }];

                        groupedByTypeMonsters.forEach(function(elm, i) {
                            elm.data = $filter('orderBy')(elm.data, ['level_min', 'name']);
                        });

                        var allMonsters = $filter('orderBy')(monsters, ['monster_type_prio', 'name']);

                        var region = $routeParams['region'];
                        if(region) {
                            $scope.groupedMonsters = groupedByTypeMonsters;
                        } else {
                            $scope.groupedMonsters = [{data: allMonsters}];
                        }

                        $scope.groupByType = function() {
                            if($scope.groupedByType) {
                                $scope.groupedMonsters = groupedByTypeMonsters;
                            } else {
                                $scope.groupedMonsters = [{data: allMonsters}];
                            }
                        };

                        var promise = $timeout(function(){
                            if($location.hash() && !that.scrolled) {
                                that.scrolled = true;
                                $anchorScroll();
                            }
                            $timeout.cancel(promise);
                        },0);
                    }
                }
            }]
        }
    }]);