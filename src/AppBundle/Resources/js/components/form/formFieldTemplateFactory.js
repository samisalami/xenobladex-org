'use strict';

angular.module('app')
.factory('formFieldTemplate', function() {
    return {
        fieldsetTextarea:   'templates/fieldsetTextareaView.html',
        fieldsetInputText:  'templates/fieldsetInputTextView.html',
        fieldsetInputCheckbox:  'templates/fieldsetInputCheckboxView.html',
        inputText:  'templates/inputTextView.html',
        inputCheckbox:  'templates/inputCheckboxView.html'
    };
});