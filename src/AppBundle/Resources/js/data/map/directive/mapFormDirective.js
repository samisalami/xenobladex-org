'use strict';

angular.module('app')
    .directive('mapForm',['MapService', 'AttachmentService', '$filter', function(MapService, AttachmentService, $filter) {
        return {
            restrict: 'E',
            replace: false,
            templateUrl: 'js/data/map/view/mapFormView.html',
            scope: {
                mapSealed: "=map",
                addForm: "@"
            },
            controller: ['$scope',function($scope) {
                var that = this;
                init();

                function init() {
                    setFormMap($scope.mapSealed);

                    AttachmentService.getAttachments(function(attachments){
                        setAttachmentData(attachments);
                    });
                }

                function setAttachmentData(attachments) {
                    that.attachments = attachments;
                    that.attachment = that.map.attachment ? $.extend({},$filter('byId')(persons, that.map.person),true) : {};
                }

                function setFormMap(map) {
                    that.map = $.extend({}, map, true);
                }

                function setAttachment(callback) {
                    if(that.attachment.id) {
                        that.map.attachment = that.attachment.id;
                        callback();
                    } else {
                        callback();
                    }
                }

                that.deleteMap = function() {
                    MapService.deleteMap(that.map);
                };

                that.updateMap = function() {
                    if(!that.isUpdating) {
                        that.isUpdating = true;
                        setAttachment(function () {
                            if (that.map.id) {
                                MapService.updateMap(that.map);
                                that.isUpdating = false;
                            } else {
                                MapService.addMap(that.map);
                                setFormMap($scope.mapSealed);
                                that.isUpdating = false;
                            }
                        });
                    }
                }
            }],
            controllerAs: 'form'
        }
    }]);