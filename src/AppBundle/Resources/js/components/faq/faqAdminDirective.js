'use strict';

angular.module('app')
    .directive('faqAdmin',['faqService', 'attachmentService', 'flashService', '$filter', function(faqService, attachmentService, flashService, $filter) {
        return {
            templateUrl:'templates/faqAdminView.html',
            replace: true,
            link: function($scope, $element,$attrs){
                $scope.newFAQ = {};

                var initFormModel = function() {
                    $scope.formModel = [
                        {
                            label: 'Frage',
                            name: 'question',
                            type: 'editableTextarea'
                        },
                        {
                            label: 'Antwort',
                            name: 'answer',
                            type: 'editableTextarea'
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

                $scope.deleteFAQ = function(id, index) {
                    faqService.deleteFAQ(id, function(faq){
                        $scope.faqs.splice(index, 1);
                        $scope.deletedFAQ = faq;
                    });
                };

                $scope.addDeletedFAQ = function() {
                    $scope.addFAQ($scope.deletedFAQ);
                    $scope.deletedFAQ = null;
                };
            }
        }
    }]);