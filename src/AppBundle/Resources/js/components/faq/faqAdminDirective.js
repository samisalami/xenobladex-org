'use strict';

angular.module('app')
    .directive('faqAdmin',['faqService', 'attachmentService', 'flashService', '$filter', function(faqService, attachmentService, flashService, $filter) {
        return {
            templateUrl:'templates/faqAdminView.html',
            replace: true,
            link: function($scope, $element,$attrs){
                $scope.newFAQ = {};

                var categoryList = [
                    {name:'Generelles'},
                    {name:'Charakterentwicklung'},
                    {name:'Kampfsystem'},
                    {name:'Sonden'},
                    {name:'BLADE & Divisionen'},
                    {name:'Online'},
                    {name:'Sonstiges'}
                ];

                var initFormModel = function() {
                    $scope.formModel = [
                        {
                            label: 'Antwort',
                            name: 'answer',
                            type: 'editableTextarea'
                        },
                        {
                            label: 'Kategorie',
                            name: 'category',
                            type: 'editableStringSelect',
                            data: categoryList
                        }
                    ];
                };

                faqService.getFAQs(function(response){
                    $scope.faqs = response;
                });

                attachmentService.getAttachments(function(attachments){
                    $scope.attachments = attachments;
                    initFormModel();
                });

                $scope.updateFAQ = function(faq) {
                    faqService.updateFAQ(faq);
                };

                $scope.addFAQ = function(faq) {
                    if(faq) {
                        faqService.addFAQ(faq, function(){
                            faqService.getFAQs(function(response){
                                $scope.faqs = response;
                            });
                            $scope.newFAQ = {};
                            flashService.clear();
                        });
                    } else {
                        flashService.error('Komplett leere Daten werden nicht angelegt.');
                    }
                };

                $scope.deleteFAQ = function(faq) {
                    faqService.deleteFAQ(faq.id, function(deletedFaq){
                        $scope.deletedFAQ = deletedFaq;
                        var index = $scope.faqs.indexOf(faq);
                        if(index !== -1) {
                            $scope.faqs.splice(index,1);
                        }
                    });
                };

                $scope.addDeletedFAQ = function() {
                    $scope.addFAQ($scope.deletedFAQ);
                    $scope.deletedFAQ = null;
                };
            }
        }
    }]);