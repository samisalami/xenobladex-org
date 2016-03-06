'use strict';

angular.module('app')
    .directive('faqForm',['FaqService', 'FaqCategoryService', function(FaqService, FaqCategoryService) {
        return {
            restrict: 'E',
            replace: false,
            templateUrl: 'js/data/faq/view/faqFormView.html',
            scope: {
                faqSealed: "=faq",
                addForm: "@"
            },
            controller: ['$scope',function($scope) {
                var that = this;
                init();

                function init() {
                    setFormFaq($scope.faqSealed);
                    setFaqCategories(FaqCategoryService.FaqCategories);
                }

                function setFaqCategories(faqCategories) {
                    that.faqCategories = faqCategories;
                }

                function setFormFaq(faq) {
                    that.faq = $.extend({}, faq, true);
                }

                that.deleteFaq = function() {
                    FaqService.deleteFaq(that.faq);
                };

                that.updateFaq = function() {
                    if(that.faq.id) {
                        FaqService.updateFaq(that.faq);
                    } else {
                        FaqService.addFaq(that.faq);
                        setFormFaq($scope.faqSealed);
                    }
                }
            }],
            controllerAs: 'form'
        }
    }]);