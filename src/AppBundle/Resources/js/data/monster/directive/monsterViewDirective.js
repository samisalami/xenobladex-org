'use strict';

angular.module('app')
    .directive('monsterView',['MonsterService','$filter', function(MonsterService, $filter) {
        return {
            restrict: 'E',
            link: function($scope, $element,$attrs){
                init();

                function init() {
                    MonsterService.onMonstersChanged(setMonsters);
                    setMonsters(MonsterService.getMonsters());
                }

                function setMonsters(monsters) {
                    var usual_monsters = $filter('filter')(monsters, {is_story:false, is_unique:false});
                    var story_monsters = $filter('filter')(monsters, {is_story:true});
                    var unique_monsters = $filter('filter')(monsters, {is_unique:true});

                    $scope.groupedMonsters = [{
                        name: 'Tyrannen',
                        data: unique_monsters
                    }, {
                        name: 'Handlungsgegner',
                        data: story_monsters
                    }, {
                        name: 'Kreaturen',
                        data: usual_monsters
                    }];
                }
            }
        }
    }]);