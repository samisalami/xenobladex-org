'use strict';

angular.module('app')
    .factory('DayTimeService', DayTimeService);

    DayTimeService.$inject = ['$http'];

    function DayTimeService($http) {
        function data() {
            return [
                'Immer',
                'Tagsüber',
                'Nachts',
                'Früh Morgens',
                'Vormittags',
                'Nachmittags',
                'Abends',
                'Spät Nachts'
            ];
        }

        return {
            DayTimes: load()
        };

        function load() {
            return data();
        }
    }