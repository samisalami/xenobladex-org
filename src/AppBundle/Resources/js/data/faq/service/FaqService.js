'use strict';

angular.module('app')
    .factory('FaqService', FaqService);

FaqService.$inject = ['$http'];

function FaqService($http) {
    var onFaqsChangedCallbacks = [];
    var onFaqDeletedCallbacks = [];
    var faqs = null;
    var faqsRequested = false;

    return {
        Faq: Faq,
        getFaqs: getFaqs,
        loadFaqs: loadFaqs,
        addFaq: addFaq,
        updateFaq: updateFaq,
        deleteFaq: deleteFaq,
        onFaqsChanged: onFaqsChanged,
        onFaqDeleted: onFaqDeleted,
        createFromResponse: createFromResponse
    };

    function Faq(
        id,
        name,
        answer,
        answer_read_more,
        category)
    {
        this.id = id;
        this.name = name;
        this.answer = answer;
        this.answer_read_more = answer_read_more;
        this.category = category;

        Object.seal(this);
    }

    function getFaqs() {
        if(!faqsRequested) {
            loadFaqs();
        } else {
            return faqs;
        }
    }

    function createFromResponse(faq) {
        if (faq) {
            return new Faq(
                faq['id'],
                faq['name'],
                faq['answer'],
                faq['answer_read_more'],
                faq['category']
            );
        }
    }

    function onFaqsChanged(callback) {
        onFaqsChangedCallbacks.push(callback);
    }

    function onFaqDeleted(callback) {
        onFaqDeletedCallbacks.push(callback);
    }

    function notifyFaqsChanged(faqs) {
        onFaqsChangedCallbacks.forEach(function(callback){
            callback(faqs);
        });
    }

    function notifyFaqDeleted(faq) {
        onFaqDeletedCallbacks.forEach(function(callback){
            callback(faq);
        });
    }

    function loadFaqs() {
        faqsRequested = true;
        var url = Routing.generate('get_faqs');
        return $http
            .get(url)
            .then(function(response){
                faqs = response.data.map(function(faq){
                    return createFromResponse(faq);
                });
                notifyFaqsChanged(faqs);
            })
    }

    function addFaq(faq) {
        var url = Routing.generate('add_faq');
        return $http.post(url, faq)
            .then(function(response){
                faqs = response.data.map(function(faq){
                    return createFromResponse(faq);
                });
                notifyFaqsChanged(faqs);
            });
    }

    function updateFaq(faq) {
        var url = Routing.generate('update_faq', {id: faq.id});
        return $http.put(url, faq)
            .then(function(response){
                faqs = response.data.map(function(faq){
                    return createFromResponse(faq);
                });
                notifyFaqsChanged(faqs);
            });
    }

    function deleteFaq(faq) {
        var url = Routing.generate('delete_faq', {id: faq.id});
        return $http.delete(url)
            .then(function(response){
                faqs = response.data.map(function(faq){
                    return createFromResponse(faq);
                });
                notifyFaqsChanged(faqs);
                notifyFaqDeleted(faq);
            });
    }
}