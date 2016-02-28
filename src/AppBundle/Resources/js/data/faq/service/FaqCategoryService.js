'use strict';

angular.module('app')
    .factory('FaqCategoryService', FaqCategoryService);

    FaqCategoryService.$inject = ['$http'];

    function FaqCategoryService($http) {
        function data() {
            return [
                'Generelles',
                'Charakterentwicklung',
                'Kampfsystem',
                'Sonden',
                'Skells',
                'BLADE & Divisionen',
                'Online',
                'Sonstiges'
            ];
        }

        return {
            FaqCategories: load()
        };

        function load() {
            return data();
        }
    }