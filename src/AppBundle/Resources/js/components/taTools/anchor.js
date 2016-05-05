function taAnchor() {

    return {
        action: function(){
            var that = this;
            var sel, range;

            var $selectionElm = $(document.getSelection().anchorNode);
            if(!$selectionElm.hasClass('ta-anchor') && $selectionElm.parents('.ta-anchor').length===0) {
                if (window.getSelection && (sel = window.getSelection()).rangeCount) {
                    range = sel.getRangeAt(0);
                    range.collapse(true);

                    var id = prompt('Anker-Schlüssel (muss einzigartig sein!):');
                    var $link = $('<a id="' + id + '" class="ta-anchor"><span>#' + id + '</span></a>');
                    var link = $link.get(0);
                    range.insertNode(link);

                    range.setStartAfter(link);
                    range.collapse(true);
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
            } else {
                $selectionElm.parents('.ta-anchor').remove();
                $selectionElm.remove();
            }
        },
        activeState: function(element) {
            var that = this;

            if(element) {
                if($(element.get(0)).hasClass('ta-anchor') || $(element.get(0)).parents('.ta-anchor').length > 0) {
                    return true;
                }
            }

            return false;
        },
        display: '<button><i class="fa fa-anchor"></i></button>'
    }
}
