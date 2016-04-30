function taSpoiler() {

    return {
        action: function(){
            var that = this;
            var string = '';

            var $selectionElm = $(document.getSelection().anchorNode);
            if(!$selectionElm.hasClass('ta-spoiler') && $selectionElm.parents('.ta-spoiler').length===0) {
                string = '<span class="xcx-spoiler ta-spoiler">'+document.getSelection()+'</span>';
            } else {
                string = $selectionElm.html();
                $selectionElm.parents('.ta-spoiler').remove();
                $selectionElm.remove();
            }

            that.$editor().wrapSelection('inserthtml',string);

        },
        activeState: function(element) {
            var that = this;

            if(element) {
                if($(element.get(0)).hasClass('ta-spoiler') || $(element.get(0)).parents('.ta-spoiler').length > 0) {
                    return true;
                }
            }

            return false;
        },
        display: '<button>Spoiler</button>'
    }
}
