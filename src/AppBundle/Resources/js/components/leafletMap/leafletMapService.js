angular.module('app')
    .factory('leafletMapService', LeafletMapService);

function LeafletMapService() {
    var domId = "xenobladex-leaftlet-map";
    var map = null;
    var template = '<div class="xenobladex-leaftlet-map-wrapper"><div style="width: 800px; height: 800px; max-width: 100%;" id="'+domId+'"></div></div>';
    var $mapElement = $();

    return {
        getMap: getMap,
        getMapElement: getMapElement
    };

    function getMap() {
        if (!map) {
            init();
        }
        return map;
    }

    function getMapElement() {
        return $mapElement;
    }

    function init() {
        $mapElement = $(template).appendTo($('body'));
        map = L.map(domId, {
            zoom: 2,
            minZoom: 1,
            maxZoom: 5,
            center: [0,0]
        });

        L.tileLayer('https://www.xenobladex.org/maps/mira8192/{z}/{x}/{y}.png', {
            attribution: '© XenobladeX.org',
            tms: true,
            noWrap: true
        }).addTo(map);
    }
}