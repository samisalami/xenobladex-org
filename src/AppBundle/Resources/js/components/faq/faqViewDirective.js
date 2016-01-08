'use strict';

angular.module('app')
    .directive('faqView',['faqService','$filter', function(faqService, $filter) {
        return {
            restrict: 'E',
            link: function($scope, $element,$attrs){
                $scope.contentId = 'faq-'+Date.now();
                faqService.getFAQs(function(response){
                    $scope.faqs = response;
                });
            }
        }
    }]);