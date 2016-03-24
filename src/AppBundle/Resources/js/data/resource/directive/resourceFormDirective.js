'use strict';

angular.module('app')
    .directive('resourceForm',['ResourceService', 'RarityService', 'RegionService', function(ResourceService, RarityService, RegionService) {
        return {
            restrict: 'E',
            replace: false,
            templateUrl: 'js/data/resource/view/resourceFormView.html',
            scope: {
                resourceSealed: "=resource",
                addForm: "@"
            },
            controller: ['$scope',function($scope) {
                var that = this;
                init();

                function init() {
                    setFormResource($scope.resourceSealed);
                    setRarities(RarityService.Rarities);
                    setRegions(RegionService.Regions);
                }

                function setRarities(rarities) {
                    that.rarities = rarities;
                }

                function setRegions(regions) {
                    that.regions = regions;
                }

                function setFormResource(resource) {
                    that.resource = $.extend({}, resource, true);
                }

                that.deleteResource = function() {
                    ResourceService.deleteResource(that.resource);
                };

                that.updateResource = function() {
                    if(that.resource.id) {
                        ResourceService.updateResource(that.resource);
                    } else {
                        ResourceService.addResource(that.resource);
                        setFormResource($scope.resourceSealed);
                    }
                }
            }],
            controllerAs: 'form'
        }
    }]);