'use strict';

angular.module('app')
    .directive('guideView',['GuideService','$filter', '$timeout', '$location', '$anchorScroll', '$routeParams', function(GuideService, $filter, $timeout, $location, $anchorScroll, $routeParams) {
        return {
            restrict: 'EA',
            controller: ['$scope',function($scope) {
                var that = this;
                that.scrolled = false;
                that.guides = [];
                that.guideTiers = [];
                init();

                function init() {
                    GuideService.onGuidesChanged(setGuides);
                    setGuides(GuideService.getGuides());
                }

                function setGuides(guides) {
                    that.guides = guides;
                    setViewData();
                }

                function setViewData() {
                    if(that.guides) {
                        var guideId = $routeParams['guideId'];
                        if(guideId) {
                            if(!$filter('byId')(that.guides, guideId)) {
                                $location.path('guide/nicht-gefunden');
                            }
                        }
                    }
                }
            }]
        }
    }]);