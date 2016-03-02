'use strict';

angular.module('app')
    .directive('monsterForm',['MonsterService', 'MonsterTypeService', 'RegionService', 'DayTimeService', function(MonsterService, MonsterTypeService, RegionService, DayTimeService) {
        return {
            restrict: 'E',
            replace: false,
            templateUrl: 'js/data/monster/view/monsterFormView.html',
            scope: {
                monsterSealed: "=monster",
                addForm: "@"
            },
            controller: ['$scope',function($scope) {
                var that = this;
                init();

                function init() {
                    setFormMonster($scope.monsterSealed);

                    //MonsterTypeService.onMonsterTypesChanged(setMonsterTypeData);
                    //setMonsterTypeData(MonsterTypeService.getMonsterTypes());

                    setRegions(RegionService.Regions);
                    setDayTimes(DayTimeService.DayTimes);
                }

                function setRegions(regions) {
                    that.regions = regions;
                }

                function setDayTimes(dayTimes) {
                    that.dayTimes = dayTimes;
                }

                //function setMonsterTypeData(monsterTypes) {
                //    that.monsterTypes = monsterTypes;
                //    that.monsterType = that.monster.monsterType ? $.extend({},$filter('byId')(monsterTypes, that.monster.monsterType),true) : {};
                //}

                function setFormMonster(monster) {
                    that.monster = $.extend({}, monster, true);
                }

                function setMonsterType(callback) {
                    //if(that.monsterType.id) {
                    //    that.monster.monsterType = that.monsterType.id;
                        callback();
                    //} else {
                    //    MonsterTypeService.addMonsterType(that.monsterType).then(function(response) {
                    //        console.log(response);
                    //        that.monster.monsterType = response.data.id;
                    //        callback();
                    //    });
                    //}
                }

                that.deleteMonster = function() {
                    MonsterService.deleteMonster(that.monster);
                };

                that.updateMonster = function() {
                    setMonsterType(function() {
                        if(that.monster.id) {
                            MonsterService.updateMonster(that.monster);
                        } else {
                            MonsterService.addMonster(that.monster);
                            setFormMonster($scope.monsterSealed);
                        }
                    });
                }
            }],
            controllerAs: 'form'
        }
    }]);