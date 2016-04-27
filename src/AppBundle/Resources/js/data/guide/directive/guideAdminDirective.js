'use strict';

angular.module('app')
    .directive('guideAdmin',['GuideService',  function(GuideService) {
        return {
            restrict: "E",
            replace: true,
            controller: ['$scope',function($scope) {
                var that = this;
                init();

                function init() {
                    GuideService.onGuidesChanged(setGuides);
                    GuideService.onGuideDeleted(setDeletedGuide);
                    setGuides(GuideService.getGuides());

                    that.newGuide = GuideService.Guide;
                }

                function setGuides(guides) {
                    that.guides = guides;
                }

                function setDeletedGuide(guide) {
                    that.deletedGuide = guide;
                    delete that.deletedGuide.id;
                }

                that.addDeletedGuide = function() {
                    GuideService.addGuide(that.deletedGuide);
                    delete that.deletedGuide;
                };
            }],
            controllerAs: 'vm'
        }
    }]);