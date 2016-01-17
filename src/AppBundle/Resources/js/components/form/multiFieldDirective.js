'use strict';

angular.module('app')
    .directive('multiField',['$filter','$compile',function($filter, $compile) {
        return {
            restrict: 'E',
            link: function($scope, element, attrs) {
                var addButton = $('<button class="multifield-add btn btn-success">Neu <span class="fa fa-plus-circle"></span></button>');
                var deleteButton = '<span class="input-group-btn"><button class="multifield-delete btn btn-danger">Löschen <span class="fa fa-minus-circle"></span></button></span>';
                var elmIndex = 0;
                var originalElement = $(element).html();
                $(element).append(addButton);

                var add = function(){
                    var newElm = $($compile(originalElement)($scope));
                    $(element).append(newElm).append(addButton);
                    newElm.css('border', '5px solid red');
                    $('.input-group-btn', '.multi-field-'+elmIndex).after($(deleteButton));
                    elmIndex++;
                };
                addButton.on('click', add);

            //    NGRPEAT!!!!!!!!!!!!!!!!!!!!!!!!!

            }
        }
    }]);