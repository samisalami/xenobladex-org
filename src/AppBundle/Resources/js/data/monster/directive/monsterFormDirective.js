'use strict';

angular.module('app')
    .directive('monsterForm',['MonsterService', 'MonsterTypeService', 'RegionService', 'DayTimeService', 'WeatherService', '$filter', function(MonsterService, MonsterTypeService, RegionService, DayTimeService, WeatherService, $filter) {
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

                    MonsterTypeService.onMonsterTypesChanged(setMonsterTypeData);
                    setMonsterTypeData(MonsterTypeService.getMonsterTypes());

                    setRegions(RegionService.Regions);
                    setDayTimes(DayTimeService.DayTimes);
                    setWeathers(WeatherService.Weathers);
                }

                function setRegions(regions) {
                    that.regions = regions;
                }

                function setDayTimes(dayTimes) {
                    that.dayTimes = dayTimes;
                }

                function setWeathers(weathers) {
                    that.weathers = weathers;
                }

                function setMonsterTypeData(monsterTypes) {
                    that.monsterTypes = monsterTypes;
                    that.monsterType = that.monster.monster_type ? $.extend({},$filter('byId')(monsterTypes, that.monster.monster_type),true) : {};
                }

                function setFormMonster(monster) {
                    that.monster = $.extend({}, monster, true);
                }

                function setMonsterType(callback) {
                    if(that.monsterType.id) {
                        that.monster.monster_type = that.monsterType.id;
                        callback();
                    } else {
                        MonsterTypeService.addMonsterType(that.monsterType).then(function(response) {
                            that.monster.monster_type = response.data.id;
                            callback();
                        });
                    }
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