'use strict';

angular.module('app')
    .factory('AgressionTypeService', AgressionTypeService);

    AgressionTypeService.$inject = ['$http'];

    function AgressionTypeService($http) {
        function data() {
            return [
                'Harmlos',
                'Visuell',
                'Auditiv',
                'Visuell, Auditiv'
            ];
        }

        return {
            AgressionTypes: load()
        };

        function load() {
            return data();
        }
    }