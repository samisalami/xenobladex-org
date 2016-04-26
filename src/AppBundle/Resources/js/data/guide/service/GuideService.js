'use strict';

angular.module('app')
    .factory('GuideService', GuideService);

GuideService.$inject = ['$http', '$filter'];

function GuideService($http, $filter) {
    var onGuidesChangedCallbacks = [];
    var onGuideDeletedCallbacks = [];
    var guides = null;
    var guidesRequested = false;

    return {
        Guide: Guide,
        getGuides: getGuides,
        loadGuides: loadGuides,
        addGuide: addGuide,
        updateGuide: updateGuide,
        deleteGuide: deleteGuide,
        onGuidesChanged: onGuidesChanged,
        onGuideDeleted: onGuideDeleted,
        createFromResponse: createFromResponse
    };

    function Guide(
        id,
        name,
        copy)
    {
        this.id = id;
        this.name = name;
        this.copy = copy;

        Object.seal(this);
    }

    function getGuides() {
        if(!guidesRequested) {
            loadGuides();
        } else {
            return guides;
        }
    }

    function createFromResponse(guide) {
        if (guide) {
            return new Guide(
                guide['id'],
                guide['name'],
                guide['copy']
            );
        }
    }

    function onGuidesChanged(callback) {
        onGuidesChangedCallbacks.push(callback);
    }

    function onGuideDeleted(callback) {
        onGuideDeletedCallbacks.push(callback);
    }

    function notifyGuidesChanged(guides) {
        onGuidesChangedCallbacks.forEach(function(callback){
            callback(guides);
        });
    }

    function notifyGuideDeleted(guide) {
        onGuideDeletedCallbacks.forEach(function(callback){
            callback(guide);
        });
    }

    function loadGuides() {
        guidesRequested = true;
        var url = Routing.generate('get_guides');
        return $http
            .get(url)
            .then(function(response){
                guides = response.data.map(function(guide){
                    return createFromResponse(guide);
                });
                notifyGuidesChanged(guides);
            })
    }

    function addGuide(guide) {
        var url = Routing.generate('add_guide');
        return $http.post(url, guide)
            .then(function(response){
                guides.push(response.data);
                notifyGuidesChanged(guides);
                return response;
            });
    }

    function updateGuide(guide) {
        var url = Routing.generate('update_guide', {id: guide.id});
        return $http.put(url, guide)
            .then(function(response){
                var index = guides.indexOf($filter('byId')(guides, guide.id));
                guides.splice(index, 1, response.data);
                notifyGuidesChanged(guides);
                return response;
            });
    }

    function deleteGuide(guide) {
        var url = Routing.generate('delete_guide', {id: guide.id});
        return $http.delete(url)
            .then(function(response){
                var index = guides.indexOf($filter('byId')(guides, guide.id));
                guides.splice(index, 1);
                notifyGuidesChanged(guides);
                notifyGuideDeleted(guide);
                return response;
            });
    }
}