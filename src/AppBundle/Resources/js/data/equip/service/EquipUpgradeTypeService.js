'use strict';

angular.module('app')
    .factory('EquipUpgradeTypeService', EquipUpgradeTypeService);

    EquipUpgradeTypeService.$inject = ['$http'];

    function EquipUpgradeTypeService($http) {
        function data() {
            return [
                'Waffen',
                'Rüstungen',
                'Skell-Waffen',
                'Skell-Panzerungen',
                'Skell-Zusätze'
            ];
        }

        return {
            EquipUpgradeTypes: load()
        };

        function load() {
            return data();
        }
    }