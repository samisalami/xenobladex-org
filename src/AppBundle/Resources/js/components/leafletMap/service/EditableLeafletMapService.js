angular.module('app')
    .factory('EditableLeafletMapService', ['LeafletMapService',EditableLeafletMapService]);

function EditableLeafletMapService(LeafletMapService) {
    var map = null;
    var drawnItems = null;
    var drawControl = null;

    return {
        getMap: getMap,
        clearMap: LeafletMapService.clearMap,
        setData: LeafletMapService.setData,
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

    function init(map) {
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

    function getGeoJson() {
        return drawnItems.toGeoJSON();
    }
}