'use strict';

angular.module('app')
    .directive('monsterTypeForm',['MonsterTypeService', 'MaterialService', '$filter', function(MonsterTypeService, MaterialService, $filter) {
        return {
            restrict: 'E',
            replace: false,
            templateUrl: 'js/data/monster/view/monsterTypeFormView.html',
            scope: {
                monsterTypeSealed: "=monsterType",
                addForm: "@"
            },
            controller: ['$scope',function($scope) {
                var that = this;
                init();

                function init() {
                    setFormMonsterType($scope.monsterTypeSealed);

                    MaterialService.onMaterialsChanged(setMaterialData);
                    setMaterialData(MaterialService.getMaterials());
                }

                function setFormMonsterType(monsterType) {
                    that.monsterType = $.extend({}, monsterType, true);
                }

                function setMaterialData(materials) {
                    that.materialsData = materials;
                    that.materials = [];

                    if(that.monsterType.materials) {
                        var count = that.monsterType.materials.length;
                        for (var i=0; i<count; i++) {
                            var material = that.monsterType.materials[i];
                            that.materials.push($.extend({},$filter('byId')(materials, material),true))
                        }
                    }
                }

                function setMaterials(callback) {
                    if(that.materials.length>0) {
                        var total = that.materials.length;
                        that.monsterType.materials = [];
                        that.materials.forEach(function(material, i) {
                            if(material.id) {
                                that.monsterType.materials.push(material.id);
                                if(i == total-1) {
                                    callback();
                                }
                            } else {
                                MaterialService.addMaterial(material).then(function(response){
                                    that.monsterType.materials.push(response.data.id);
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

                that.deleteMonsterType = function() {
                    MonsterTypeService.deleteMonsterType(that.monsterType);
                };

                that.updateMonsterType = function() {
                    if(!that.isUpdating) {
                        that.isUpdating = true;
                        setMaterials(function () {
                            if (that.monsterType.id) {
                                MonsterTypeService.updateMonsterType(that.monsterType);
                                that.isUpdating = false;
                            } else {
                                MonsterTypeService.addMonsterType(that.monsterType);
                                setFormMonsterType($scope.monsterTypeSealed);
                                that.materials = [];
                                that.isUpdating = false;
                            }
                        });
                    }
                }
            }],
            controllerAs: 'form'
        }
    }]);