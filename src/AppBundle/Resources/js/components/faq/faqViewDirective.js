'use strict';

angular.module('app')
    .directive('faqView',['faqService','$filter', function(faqService, $filter) {
        return {
            restrict: 'E',
            link: function($scope, $element,$attrs){
                faqService.getFAQs(function(response){
                    $scope.groupedFaqs = $filter('groupByFilter')(response,'category');
                });
            }
        }
    }]);