'use strict';

angular.module('app')
    .factory('SideJobTypeService', SideJobTypeService);

    SideJobTypeService.$inject = ['$http'];

    function SideJobTypeService($http) {
        function data() {
            return [
                'Suche',
                'Jagd',
                'Gespräch'
            ];
        }

        return {
            SideJobTypes: load()
        };

        function load() {
            return data();
        }
    }