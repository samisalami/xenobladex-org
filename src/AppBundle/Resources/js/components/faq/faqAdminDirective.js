'use strict';

angular.module('app')
    .directive('faqAdmin',['FaqService', function(FaqService) {
        return {
            restrict: "E",
            replace: true,
            controller: ['$scope',function($scope) {
                var that = this;
                init();

                function init() {
                    FaqService.onFaqsChanged(setFaqs);
                    FaqService.onFaqDeleted(setDeletedFaq);
                    setFaqs(FaqService.getFaqs());

                    that.newFaq = FaqService.Faq;
                }

                function setFaqs(faqs) {
                    that.faqs = faqs;
                }

                function setDeletedFaq(faq) {
                    that.deletedFaq = faq;
                    delete that.deletedFaq.id;
                }

                that.addDeletedFaq = function() {
                    FaqService.addFaq(that.deletedFaq);
                    delete that.deletedFaq;
                };
            }],
            controllerAs: 'vm',
            link: function($scope, $element,$attrs){

                var initFormModel = function() {
                    $scope.formModel = {
                        orderBy: ['category', 'name'],
                        fields:[
                            {
                                label: 'Antwort',
                                name: 'answer',
                                type: 'textarea'
                            },
                            {
                                label: 'Antwort - Erweitert',
                                name: 'answer_read_more',
                                type: 'textarea'
                            },
                            {
                                label: 'Kategorie',
                                name: 'category',
                                type: 'stringSelect',
                                data: categoryList,
                                fieldInfoTooltip: 'Wenn keine Kategorie gewählt, wird "Sonstiges" gesetzt.'
                            }
                        ]
                    };
                };
            }
        }
    }]);