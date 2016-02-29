'use strict';

angular.module('app')
    .factory('RarityService', RarityService);

    RarityService.$inject = ['$http'];

    function RarityService($http) {
        function data() {
            return [
                'Gewöhnlich',
                'Wertvoll',
                'Sehr wertvoll',
                'Extrem wertvoll',
                'Unbezahlbar'
            ];
        }

        return {
            Rarities: load()
        };

        function load() {
            return data();
        }
    }