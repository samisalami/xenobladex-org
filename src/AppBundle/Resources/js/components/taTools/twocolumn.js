function taTwoColumn() {

    return {
        action: function(){
            var that = this;
            var string = '';

            var $selectionElm = $(document.getSelection().anchorNode);
            if(!$selectionElm.hasClass('ta-two-column') && $selectionElm.parents('.ta-two-column').length===0) {
                string = '<div class="ta-two-column"><table class="table">' +
                    '<tr><td>'+document.getSelection()+'</td><td></td></tr>' +
                    '</table></div>';
            } else {
                string = $selectionElm.parents('tr').html();
                $selectionElm.parents('.ta-two-column').remove();
            }

            that.$editor().wrapSelection('inserthtml',string);

        },
        activeState: function(element) {
            var that = this;

            if(element) {
                if($(element.get(0)).hasClass('ta-two-column') || $(element.get(0)).parents('.ta-two-column').length > 0) {
                    return true;
                }
            }

            return false;
        },
        display: '<button><i class="fa fa-columns"></i></button>'
    }
}
