'use strict';

angular.module('app')
    .directive('resourceRecipeForm',['ResourceRecipeService', 'ResourceService', '$filter', function(ResourceRecipeService, ResourceService, $filter) {
        return {
            restrict: 'E',
            replace: false,
            templateUrl: 'js/data/resource/view/resourceRecipeFormView.html',
            scope: {
                resourceRecipeSealed: "=resourceRecipe",
                addForm: "@",
                callback: "&"
            },
            controller: ['$scope',function($scope) {
                var that = this;
                init();

                function init() {
                    setFormResourceRecipe($scope.resourceRecipeSealed);

                    ResourceService.onResourcesChanged(setResourceData);
                    setResourceData(ResourceService.getResources());
                }

                function setFormResourceRecipe(resourceRecipe) {
                    that.resourceRecipe = $.extend({}, resourceRecipe, true);
                }

                function setResourceData(resources) {
                    that.resources = resources;
                    that.resource = that.resourceRecipe.resource ? $.extend({},$filter('byId')(resources, that.resourceRecipe.resource),true) : {};
                }

                function setResource(callback) {
                    if(that.resource.id || that.resource.name) {
                        if(that.resource.id) {
                            that.resourceRecipe.resource = that.resource.id;
                            callback();
                        } else {
                            ResourceService.addResource(that.resource).then(function(response) {
                                that.resourceRecipe.resource = response.data.id;
                                callback();
                            });
                        }
                    } else {
                        callback();
                    }
                }

                that.deleteResourceRecipe = function() {
                    ResourceRecipeService.deleteResourceRecipe(that.resourceRecipe);
                };

                that.updateResourceRecipe = function() {
                    if(!that.isUpdating) {
                        that.isUpdating = true;
                        setResource(function () {
                            if (that.resourceRecipe.id) {
                                ResourceRecipeService.updateResourceRecipe(that.resourceRecipe);
                                setResourceData(that.resources);
                                that.isUpdating = false;
                            } else {
                                ResourceRecipeService.addResourceRecipe(that.resourceRecipe);
                                setFormResourceRecipe($scope.resourceRecipeSealed);
                                setResourceData(that.resources);
                                that.isUpdating = false;
                            }
                        });
                    }
                }
            }],
            controllerAs: 'form'
        }
    }]);