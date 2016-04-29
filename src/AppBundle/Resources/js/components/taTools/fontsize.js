function taFontSize() {
    return {
        action: function(){
            var that = this;

            that.taFontSizeChange = function() {
                that.$editor().wrapSelection('fontsize', that.taFontSize);
            };
        },
        activeState: function(element) {
            var that = this;
            that.taFontSize = '16';

            if(element) {
                var fontSize = window.getComputedStyle(element.get(0), null).getPropertyValue('font-size');
                that.taFontSize = parseInt(fontSize)+'';
            }
        },
        //http://stackoverflow.com/questions/33631155/textangular-adding-dropdown-to-toolbar
        display:        '<select style="display: inline-block; width: auto;" ng-change="taFontSizeChange()" ng-model="taFontSize">' +
                            '<option value="10">10</option>' +
                            '<option value="12">12</option>' +
                            '<option value="14">14</option>' +
                            '<option value="16">16</option>' +
                            '<option value="18">18</option>' +
                            '<option value="20">20</option>' +
                            '<option value="24">24</option>' +
                            '<option value="30">30</option>' +
                            '<option value="46">46</option>' +
                            '<option value="72">72</option>' +
                        '</select>'
    }
}
