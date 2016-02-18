'use strict';

angular.module('app')
    .factory('MissionTypeService', MissionTypeService);

    MissionTypeService.$inject = ['$http', '$timeout'];

    function MissionTypeService($http, $timeout) {
        return {
            MissionType: MissionType,
            loadMissionTypes: loadMissionTypes
        };

        function MissionType(id, name) {
            this.id = id;
            this.name = name;

            Object.seal(this);
        }

        function createFromResponse(missionType) {
            if(missionType) {
                return new MissionType(
                    missionType['id'],
                    missionType['name']
                );
            }
            return {};
        }

        function loadMissionTypes(callback) {
            var url = Routing.generate('get_mission_types');
            return $http
                .get(url)
                .then(function(response){
                    callback(response.data);
                })
        }

    }