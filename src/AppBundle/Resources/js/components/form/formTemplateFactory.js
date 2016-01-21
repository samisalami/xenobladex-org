'use strict';

angular.module('app')
.factory('formTemplateFactory', function() {
    return {
        fieldsetTextarea:   'js/components/form/fieldsetTextareaView.html',
        fieldsetInputText:  'js/components/form/fieldsetInputTextView.html',
        fieldsetInputCheckbox:  'js/components/form/fieldsetInputCheckboxView.html',
        inputText:  'js/components/form/inputTextView.html',
        inputCheckbox:  'js/components/form/inputCheckboxView.html',
        editableTextarea: 'js/components/form/editableTextareaView.html',
        editableText: 'js/components/form/editableTextView.html',
        editableStringSelect: 'js/components/form/editableStringSelectView.html',
        editableObjectSelect: 'js/components/form/editableObjectSelectView.html',
        customMissionPersonSelect: 'js/components/form/customMissionPersonSelect.html',
        customAttachmentInput: 'js/components/form/customAttachmentInput.html',
        customMapmarkerInput: 'js/components/form/customMapmarkerInput.html',
        customMaterialInput: 'js/components/form/customMaterialInput.html'
    };
});