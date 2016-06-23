angular.module('app')
    .factory('leafletMapService', LeafletMapService);

function LeafletMapService() {
    return {
        tileLayer: tileLayer
    };

    function tileLayer(map) {
        if(typeof map == "undefined") {
            throw new Error("No map given!");
        }

        L.tileLayer('https://www.xenobladex.org/maps/mira8192/{z}/{x}/{y}.png', {
            attribution: '© XenobladeX.org',
            tms: true,
            noWrap: true
        }).addTo(map);
    }
}