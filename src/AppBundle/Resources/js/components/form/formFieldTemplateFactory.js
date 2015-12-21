'use strict';

angular.module('app')
.factory('formFieldTemplate', function() {
    return {
        fieldsetTextarea:   'templates/fieldsetTextareaView.html',
        fieldsetInputText:  'templates/fieldsetInputTextView.html'
    };
});