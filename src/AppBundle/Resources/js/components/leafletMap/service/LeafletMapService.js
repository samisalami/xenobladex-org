angular.module('app')
    .factory('leafletMapService', LeafletMapService);

function LeafletMapService() {
    var domId = "xenobladex-leaftlet-map";
    var map = null;
    var template = '<div class="xenobladex-leaftlet-map-wrapper"><div style="width: 800px; height: 800px; max-width: 100%;" id="'+domId+'"></div></div>';
    var $mapElement = $();
    var drawnItems = null;
    var drawControl = null;

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

        drawnItems = new L.FeatureGroup();
        map.addLayer(drawnItems);

        drawControl = new L.Control.Draw({
            edit: {
                featureGroup: drawnItems
            }
        });
        map.addControl(drawControl);

        map.on('draw:created', function (e) {
            var type = e.layerType,
                layer = e.layer;
            drawnItems.addLayer(layer);
        });
    }
}