angular.module('app')
    .factory('LeafletMapService', LeafletMapService);

function LeafletMapService() {
    var domId = "xenobladex-leaftlet-map";
    var map = null;
    var template = '<div class="xenobladex-leaftlet-map-wrapper"><div style="width: calc(100vw - 40px); height: calc(100vh - 180px); max-width: 100%;" id="'+domId+'"></div></div>';
    var $mapElement = $();
    var onChangedCallbacks = [];
    var onCreatedCallbacks = [];
    var onDeletedCallbacks = [];
    var data = null;

    return {
        getMap: getMap,
        clearMap: clearMap,
        setData: setData,
        getMapElement: getMapElement,
        onChanged: onChanged,
        onCreated: onCreated,
        onDeleted: onDeleted,
        bindCallbacks: bindCallbacks,
        clearCallbacks: clearCallbacks
    };

    function getMap() {
        if (!map) {
            init();
        }

        return map;
    }

    function setData(geoJson) {
        console.log('setData');
        if (map) {
            console.log(geoJson);
            data = L.geoJson(geoJson);
            data.addTo(map);
        }
    }

    function clearMap() {
        clearCallbacks();
        if (data) {
            data.clearLayers();
        }
    }

    function getMapElement() {
        return $mapElement;
    }

    function init(geoJson) {
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

        bindCallbacks();
    }

    function bindCallbacks() {
        map.on('draw:created', function (e) {
            onCreatedCallbacks.forEach(function(callback){
                callback(e);
            });
        });

        map.on('draw:edited', function (e) {
            onChangedCallbacks.forEach(function(callback){
                callback(e);
            });
        });

        map.on('draw:deleted', function (e) {
            onDeletedCallbacks.forEach(function(callback){
                callback(e);
            });
        });
    }

    function clearCallbacks() {
        onChangedCallbacks = [];
        onCreatedCallbacks = [];
        onDeletedCallbacks = [];
    }

    function onChanged(callback) {
        onChangedCallbacks.push(callback);
    }

    function onCreated(callback) {
        onCreatedCallbacks.push(callback);
    }

    function onDeleted(callback) {
        onDeletedCallbacks.push(callback);
    }
}