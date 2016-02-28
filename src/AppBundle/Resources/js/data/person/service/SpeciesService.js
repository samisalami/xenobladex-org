'use strict';

angular.module('app')
    .factory('SpeciesService', SpeciesService);

    SpeciesService.$inject = ['$http'];

    function SpeciesService($http) {
        function data() {
            return [
                'Mensch',
                'Nopon',
                'Ma-non',
                'Zarubogganer',
                'Orphen',
                'Definianer',
                'Baumklan-Prone',
                'Höhlenklan-Prone',
                'Qlu',
                'Unbekannt'
            ];
        }

        return {
            Species: load()
        };

        function load() {
            return data();
        }
    }