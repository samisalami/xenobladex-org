angular.module('app')
    .factory('EditableLeafletMapService', ['LeafletMapService',EditableLeafletMapService]);

function EditableLeafletMapService(LeafletMapService) {
    var map = null;
    var drawnItems = null;
    var drawControl = null;

    return {
        getMap: getMap,
        clearMap: clearMap,
        setData: setData,
        getMapElement: LeafletMapService.getMapElement,
        onChanged: LeafletMapService.onChanged,
        onCreated: LeafletMapService.onCreated,
        onDeleted: LeafletMapService.onDeleted,
        bindCallbacks: LeafletMapService.bindCallbacks,
        clearCallbacks: LeafletMapService.clearCallbacks,
        getGeoJson: getGeoJson
    };

    function getMap() {
        if (!map) {
            map = LeafletMapService.getMap();
            init(map);
        }

        return map;
    }

    function setData(geoJson) {
        if (map) {
            var data = L.geoJson(geoJson, {
                onEachFeature: function (feature, layer) {
                    drawnItems.addLayer(layer);
                }
            });
        }
    }

    function clearMap() {
        LeafletMapService.clearCallbacks();
        if (drawnItems) {
            drawnItems.clearLayers();
        }
    }

    function init(map) {
        drawnItems = new L.FeatureGroup();
        map.addLayer(drawnItems);

        drawControl = new L.Control.Draw({
            edit: {
                featureGroup: drawnItems
            }
        });
        map.addControl(drawControl);

        LeafletMapService.globalOnCreated(function(e){
            persistElement(e);
        });
    }

    function persistElement(e) {
        var layer = e.layer;
        drawnItems.addLayer(layer);
    }

    function getGeoJson() {
        return drawnItems.toGeoJSON();
    }
}