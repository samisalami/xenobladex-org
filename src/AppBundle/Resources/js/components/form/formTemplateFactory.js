'use strict';

angular.module('app')
.factory('formTemplateFactory', function() {
    return {
        inputText:  'js/components/form/inputTextView.html',
        inputCheckbox:  'js/components/form/inputCheckboxView.html',
        textarea: 'js/components/form/textareaView.html',
        editableTextarea: 'js/components/form/editableTextareaView.html',
        editableText: 'js/components/form/editableTextView.html',
        editableStringSelect: 'js/components/form/editableStringSelectView.html',
        stringSelect: 'js/components/form/stringSelectView.html',
        editableObjectSelect: 'js/components/form/editableObjectSelectView.html',
        objectSelect: 'js/components/form/objectSelectView.html',
        customAutoCompleteSelect: 'js/components/form/customAutoCompleteSelect.html',
        customAttachmentInput: 'js/components/form/customAttachmentInput.html',
        customMapmarkerInput: 'js/components/form/customMapmarkerInput.html',
        customMaterialInput: 'js/components/form/customMaterialInput.html',
        customMonsterMonsterTypeInput: 'js/components/form/customMonsterMonsterTypeInput.html',
        falsableStringSelect: 'js/components/form/customfalsableStringSelectView.html'
    };
});