'use strict';

angular.module('app')
    .directive('monsterTypeForm',['MonsterTypeService', 'PersonService', 'RegionService', 'SideJobTypeService', 'flashService', '$filter', function(MonsterTypeService, PersonService, RegionService, SideJobTypeService, flashService, $filter) {
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
                }

                function setFormMonsterType(monsterType) {
                    that.monsterType = $.extend({}, monsterType, true);
                }

                that.deleteMonsterType = function() {
                    MonsterTypeService.deleteMonsterType(that.monsterType);
                };

                that.updateMonsterType = function() {
                    if(that.monsterType.id) {
                        MonsterTypeService.updateMonsterType(that.monsterType);
                    } else {
                        MonsterTypeService.addMonsterType(that.monsterType);
                        setFormMonsterType($scope.monsterTypeSealed);
                    }
                }
            }],
            controllerAs: 'form'
        }
    }]);