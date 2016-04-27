'use strict';

angular.module('app')
    .directive('guideForm',['GuideService', '$location', function(GuideService, $location) {
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
                    if($scope.guideSealed) {
                        setFormGuide($scope.guideSealed);
                    }
                }

                function setFormGuide(guide) {
                    that.guide = $.extend({}, guide, true);
                }

                that.deleteGuide = function() {
                    if(confirm("Möchtest du den Guide wirklich löschen?")) {
                        GuideService.deleteGuide(that.guide).then(function(){
                            $location.path('/admin/guides');
                        });
                    }
                };

                that.updateGuide = function() {
                    if(that.guide.id) {
                        GuideService.updateGuide(that.guide);
                    } else {
                        GuideService.addGuide(that.guide).then(function(response){
                            $location.path('/admin/guide/'+response.data.id);
                        });
                    }
                }
            }],
            controllerAs: 'form'
        }
    }]);