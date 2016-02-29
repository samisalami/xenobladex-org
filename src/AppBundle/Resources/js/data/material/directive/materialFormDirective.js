'use strict';

angular.module('app')
    .directive('materialForm',['MaterialService', 'RarityService', function(MaterialService, RarityService) {
        return {
            restrict: 'E',
            replace: false,
            templateUrl: 'js/data/material/view/materialFormView.html',
            scope: {
                materialSealed: "=material",
                addForm: "@"
            },
            controller: ['$scope',function($scope) {
                var that = this;
                init();

                function init() {
                    setFormMaterial($scope.materialSealed);
                    setRarities(RarityService.Rarities);
                }

                function setRarities(rarities) {
                    that.rarities = rarities;
                }

                function setFormMaterial(material) {
                    that.material = $.extend({}, material, true);
                }

                that.deleteMaterial = function() {
                    MaterialService.deleteMaterial(that.material);
                };

                that.updateMaterial = function() {
                    if(that.material.id) {
                        MaterialService.updateMaterial(that.material);
                    } else {
                        MaterialService.addMaterial(that.material);
                        setFormMaterial($scope.materialSealed);
                    }
                }
            }],
            controllerAs: 'form'
        }
    }]);