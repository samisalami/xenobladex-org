function taFontSize() {
    var fontSizes = [10,12,14,16,18,20,24,30,46,72];
    var count = fontSizes.length;
    var template = '<div id="ta-font-size-dialog"><ul>';
    for(var i=0; i<count; i++) {
        template += '<li ng-click="taFontSizeChange('+fontSizes[i]+')">'+fontSizes[i]+'</li>';
    }
    template += '</ul></div>';

    return {
        taFontSize: 16,
        taFontSizeDialogSelector: '#ta-font-size-dialog',
        taFontSizeChange: function(fontSize) {
            var that = this;
            that.taFontSize = fontSize;

            $(that.taFontSizeDialogSelector).hide();
            var string = '<span class="ta-fontsize-'+fontSize+'">'+document.getSelection()+'</span>';
            that.$editor().wrapSelection('inserthtml',string);

        },
        action: function(){
            var that = this;

            if($(that.taFontSizeDialogSelector).is(':visible')) {
                $(that.taFontSizeDialogSelector).hide();
            } else {
                $(that.taFontSizeDialogSelector).show();
            }
        },
        activeState: function(element) {
            var that = this;

            if(element) {
                var fontSize = window.getComputedStyle(element.get(0), null).getPropertyValue('font-size');
                that.taFontSize = parseInt(fontSize);
            }
        },
        display: '<button style="position: relative" id="ta-font-size-btn"><i class="fa fa-text-height"></i> {{taFontSize}}</button>'+template
    }
}
