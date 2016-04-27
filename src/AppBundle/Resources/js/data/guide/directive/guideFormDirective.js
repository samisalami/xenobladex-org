'use strict';

angular.module('app')
    .directive('guideForm',['GuideService', function(GuideService) {
        return {
            restrict: 'E',
            replace: false,
            templateUrl: 'js/data/guide/view/guideFormView.html',
            scope: {
                guideSealed: "=guide",
                addForm: "@"
            },
            controller: ['$scope',function($scope) {
                var that = this;
                init();

                function init() {
                    setFormGuide($scope.guideSealed);
                }

                function setFormGuide(guide) {
                    that.guide = $.extend({}, guide, true);
                }

                that.deleteGuide = function() {
                    GuideService.deleteGuide(that.guide);
                };

                that.updateGuide = function() {
                    if(that.guide.id) {
                        GuideService.updateGuide(that.guide);
                    } else {
                        GuideService.addGuide(that.guide);
                        setFormGuide($scope.guideSealed);
                    }
                }
            }],
            controllerAs: 'form'
        }
    }]);