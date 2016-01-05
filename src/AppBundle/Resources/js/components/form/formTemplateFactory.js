'use strict';

angular.module('app')
.factory('formTemplateFactory', function() {
    return {
        fieldsetTextarea:   'templates/fieldsetTextareaView.html',
        fieldsetInputText:  'templates/fieldsetInputTextView.html',
        fieldsetInputCheckbox:  'templates/fieldsetInputCheckboxView.html',
        inputText:  'templates/inputTextView.html',
        inputCheckbox:  'templates/inputCheckboxView.html',
        editableTextarea: 'templates/editableTextareaView.html',
        editableText: 'templates/editableTextView.html',
        editableStringSelect: 'templates/editableStringSelectView.html',
        editableObjectSelect: 'templates/editableObjectSelectView.html',
        customMissionPersonSelect: 'templates/customMissionPersonSelect.html',
        customAttachmentInput: 'templates/customAttachmentInput.html',
        customMapmarkerInput: 'templates/customMapmarkerInput.html'
    };
});