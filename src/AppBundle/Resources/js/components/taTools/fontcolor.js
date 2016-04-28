function taFontColor() {
    return {
        action: function(){
            var that = this;

            that.taFontcolorChange = function() {
                that.$editor().wrapSelection('forecolor', that.taFontcolor);
            };

            return false;
        },
        display: '<button colorpicker colorpicker-position="top" type="button" ng-change="taFontcolorChange()" ng-model="taFontcolor"><i style="color:{{taFontcolor}};" class="fa fa-paint-brush"></i></button>'
    }
}
