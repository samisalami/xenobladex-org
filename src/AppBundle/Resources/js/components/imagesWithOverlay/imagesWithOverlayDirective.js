'use strict';

angular.module('app')
    .directive('imagesWithOverlay',['$compile', function($compile) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var $icon = $('<span class="fa fa-search"></span>');
                var $imgWrapper = $('<div class="image-with-overlay-wrapper"></div>');
                var $modal = $(
                    '<div id="images-overlay-modal" class="modal fade">' +
                    '<div class="modal-dialog" role="document">' +
                    '<div class="modal-content">' +
                    '<div class="modal-header">' +
                    '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                    '</div>' +
                    '<div class="modal-body">' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>');

                $('body').append($modal);
                var $modalContent = $('.modal-body', $modal);
                var modalContentPadding = parseInt($modalContent.css('padding-left'))+parseInt($modalContent.css('padding-right'));
                $modal.modal({show:false});

                $(element).on('bindHtmlCompile.compiled', function(){
                    initImages();
                });

                $(window).on('resize', initImages);

                function initImages() {
                    $('img', $(element)).each(function(){
                        var $img = $(this);
                        var virtualImg = new Image();

                        virtualImg.onload = function() {
                            var virtualWidth = parseInt(virtualImg.width);
                            var width = parseInt($img.width());

                            if(virtualWidth > width) {
                                if(!$img.hasClass('image-with-overlay')) {
                                    var $wrapper = $imgWrapper.clone();

                                    $img.before($wrapper);
                                    $wrapper.append($img);

                                    $img.addClass('image-with-overlay');
                                    $wrapper.append($icon.clone());

                                    $img.on('click', function(){
                                        $('img', $modalContent).remove();
                                        $img.clone().css({width: 'auto', height: 'auto'}).appendTo($modalContent);
                                        $('.modal-dialog', $modal).css('width',(virtualWidth+modalContentPadding)+'px');
                                        $modal.modal('show');
                                    });
                                }
                            }
                        };

                        virtualImg.src = $img.attr('src');
                    });
                }
            }
        }
    }]);