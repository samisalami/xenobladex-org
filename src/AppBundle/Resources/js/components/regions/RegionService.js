'use strict';

angular.module('app')
    .factory('RegionService', RegionService);

    RegionService.$inject = ['$http'];

    function RegionService($http) {
        var regions = [];
        var reqionsRequested = false;

        function regionsData() {
            return [
                {name:'BLADE-Quartier'},
                {name:'Industriegebiet'},
                {name:'Verwaltungsbezirk'},
                {name:'Wohnviertel'},
                {name:'Geschäftsviertel'},
                {name:'Ma-non-Schiff'},
                {name:'Primordia'},
                {name:'Noctilum'},
                {name:'Oblivia'},
                {name:'Sylvalum'},
                {name:'Cauldros'}
            ];
        }

        return {
            Region: Region,
            Regions: getRegions(),
            loadRegions: loadRegions
        };

        function Region(name) {
            //this.id = id;
            this.name = name;

            Object.seal(this);
        }

        function getRegions() {
            if(regions.length==0 && !reqionsRequested) {
                loadRegions();
            }

            return regions;
        }

        function createFromResponse(region) {
            if (region) {
                return new Region(
                    //region['id'],
                    region['name']
                );
            }

            return {};
        }

        function loadRegions() {
            regions = regionsData().map(
                function(region) {
                    return createFromResponse(region);
                }
            );
        }
    }