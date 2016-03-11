'use strict';

angular.module('app')
    .directive('monsterView',['MonsterService','MonsterTypeService','$filter', '$timeout', '$location', '$anchorScroll', function(MonsterService, MonsterTypeService, $filter, $timeout, $location, $anchorScroll) {
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
                        var monsters = that.monsters;
                        monsters.forEach(function(monster, index){
                            monster.monster_type = $filter('byId')(that.monsterTypes, monster.monster_type) || null;
                        });

                        var usual_monsters = $filter('filter')(monsters, {is_story:false, is_unique:false});
                        var story_monsters = $filter('filter')(monsters, {is_story:true});
                        var unique_monsters = $filter('filter')(monsters, {is_unique:true});

                        $scope.groupedMonsters = [{
                            name: 'Tyrannen',
                            hide: false,
                            data: unique_monsters
                        }, {
                            name: 'Handlungsgegner',
                            hide: false,
                            data: story_monsters
                        }, {
                            name: 'Kreaturen',
                            hide: false,
                            data: usual_monsters
                        }];

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