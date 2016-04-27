angular.module('app')
    .directive('guideById',['$filter','GuideService', function($filter, GuideService) {
        return {
            restrict: 'A',
            scope: true,
            link: function($scope, $element,$attrs){
                var guideId = $attrs.guideById;

                if(guideId) {
                    GuideService.onGuidesChanged(setGuideById);
                    setGuideById(GuideService.getGuides());
                } else {
                    $scope.guideById = {};
                }

                function setGuideById(guides) {
                    $scope.guideById = $filter('byId')(guides, guideId) || null;
                }
            }
        }
    }]);