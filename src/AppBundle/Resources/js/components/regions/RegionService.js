'use strict';

angular.module('app')
    .factory('RegionService', RegionService);

    RegionService.$inject = ['$http'];

    function RegionService($http) {
        var regions = [];
        var reqionsRequested = false;

        function regionsData() {
            return [
                'BLADE-Quartier',
                'Industriegebiet',
                'Verwaltungsbezirk',
                'Wohnviertel',
                'Geschäftsviertel',
                'Ma-non-Schiff',
                'Primordia',
                'Noctilum',
                'Oblivia',
                'Sylvalum',
                'Cauldros'
            ];
        }

        return {
            Regions: getRegions(),
            loadRegions: loadRegions
        };

        function getRegions() {
            if(regions.length==0 && !reqionsRequested) {
                loadRegions();
            }

            return regions;
        }

        function loadRegions() {
            regions = regionsData();
        }
    }