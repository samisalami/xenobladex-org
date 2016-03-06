'use strict';

angular.module('app')
    .directive('monsterForm',['MonsterService', 'MonsterTypeService', 'MaterialService', 'RegionService', 'DayTimeService', 'WeatherService', '$filter', function(MonsterService, MonsterTypeService, MaterialService, RegionService, DayTimeService, WeatherService, $filter) {
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

                    MaterialService.onMaterialsChanged(setMaterialData);
                    setMaterialData(MaterialService.getMaterials());

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

                function setMaterialData(materials) {
                    that.materialsData = materials;
                    that.materials = [];

                    if(that.monster.materials) {
                        var count = that.monster.materials.length;
                        for (var i=0; i<count; i++) {
                            var material = that.monster.materials[i];
                            that.materials.push($.extend({},$filter('byId')(materials, material),true))
                        }
                    }
                }

                function setFormMonster(monster) {
                    that.monster = $.extend({}, monster, true);
                }

                function setMonsterType(callback) {
                    if(that.monsterType.id || that.monsterType.name) {
                        if(that.monsterType.id) {
                            that.monster.monster_type = that.monsterType.id;
                            callback();
                        } else {
                            MonsterTypeService.addMonsterType(that.monsterType).then(function(response) {
                                that.monster.monster_type = response.data.id;
                                callback();
                            });
                        }
                    } else {
                        callback();
                    }
                }

                function setMaterials(callback) {
                    if(that.materials.length>0) {
                        var total = that.materials.length;
                        that.monster.materials = [];
                        that.materials.forEach(function(material, i) {
                            if(material.id) {
                                that.monster.materials.push(material.id);
                                if(i == total-1) {
                                    callback();
                                }
                            } else {
                                MaterialService.addMaterial(material).then(function(response){
                                    that.monster.materials.push(response.data.id);
                                    if(i == total-1) {
                                        callback();
                                    }
                                });
                            }
                        });
                    } else {
                        callback();
                    }
                }

                that.setMaterialByMonsterType = function() {
                    var monsterType = $filter('byId')(that.monsterTypes, that.monsterType.id);
                    that.monster.materials = monsterType ? monsterType.materials || [] : [];
                    setMaterialData(that.materialsData);
                };

                that.deleteMonster = function() {
                    MonsterService.deleteMonster(that.monster);
                };

                that.updateMonster = function() {
                    if(!that.isUpdating) {
                        that.isUpdating = true;
                        setMonsterType(function() {
                            setMaterials(function(){
                                if(that.monster.id) {
                                    MonsterService.updateMonster(that.monster);
                                    that.isUpdating = false;
                                } else {
                                    MonsterService.addMonster(that.monster);
                                    setFormMonster($scope.monsterSealed);
                                    that.isUpdating = false;
                                }
                            });
                        });
                    }
                }
            }],
            controllerAs: 'form'
        }
    }]);