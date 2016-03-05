'use strict';

angular.module('app')
    .factory('WeatherService', WeatherService);

    WeatherService.$inject = ['$http'];

    function WeatherService($http) {
        function data() {
            return [
                'Immer',
                'Atomflocken',
                'Bewölkt',
                'Gewitter',
                'Hitzewelle',
                'Klar',
                'Lichtpartikel',
                'Magnetischer Sturm',
                'Nebel',
                'Polarlicht',
                'Regen',
                'Regenbogen',
                'Rotes Polarlicht',
                'Sandsturm',
                'Schwefelregen',
                'Sporen',
                'Starker Regen',
                'Sternschnuppen'
            ];
        }

        return {
            Weathers: load()
        };

        function load() {
            return data();
        }
    }