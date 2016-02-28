'use strict';

angular.module('app')
    .directive('faqView',['FaqService','$filter', function(FaqService, $filter) {
        return {
            restrict: 'E',
            link: function($scope, $element,$attrs){
                init();

                function init() {
                    FaqService.onFaqsChanged(setFaqs);
                    setFaqs(FaqService.getFaqs());
                }

                function setFaqs(faqs) {
                    $scope.groupedFaqs = $filter('groupByFilter')(faqs,'category');
                }
            }
        }
    }]);