'use strict';

angular.module('app')
    .factory('RegionService', RegionService);

    RegionService.$inject = ['$http'];

    function RegionService($http) {
        function data() {
            return [
                'NLA',
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
                'Sonstige',
                'Cauldros'
            ];
        }

        return {
            Regions: load()
        };

        function load() {
            return data();
        }
    }