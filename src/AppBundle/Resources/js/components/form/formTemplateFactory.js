'use strict';

angular.module('app')
.factory('formTemplateFactory', function() {
    return {
        inputText:  'js/components/form/formField/fields/inputTextView.html',
        inputCheckbox:  'js/components/form/formField/fields/inputCheckboxView.html',
        textarea: 'js/components/form/formField/fields/textareaView.html',
        editableTextarea: 'js/components/form/formField/fields/editableTextareaView.html',
        editableText: 'js/components/form/formField/fields/editableTextView.html',
        editableStringSelect: 'js/components/form/formField/fields/editableStringSelectView.html',
        stringSelect: 'js/components/form/formField/fields/stringSelectView.html',
        editableObjectSelect: 'js/components/form/formField/fields/editableObjectSelectView.html',
        objectSelect: 'js/components/form/formField/fields/objectSelectView.html',
        customAutoCompleteSelect: 'js/components/form/formField/fields/customAutoCompleteSelect.html',
        customAttachmentInput: 'js/components/form/formField/fields/customAttachmentInput.html',
        customMapmarkerInput: 'js/components/form/formField/fields/customMapmarkerInput.html',
        customMaterialInput: 'js/components/form/formField/fields/customMaterialInput.html',
        customMaterialRecipeInput: 'js/components/form/formField/fields/customMaterialRecipeInput.html',
        falsableStringSelect: 'js/components/form/formField/fields/customfalsableStringSelectView.html'
    };
});