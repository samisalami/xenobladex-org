'use strict';

angular.module('app')
    .factory('MissionTypeService', MissionTypeService);

    MissionTypeService.$inject = ['$http', '$timeout'];

    function MissionTypeService($http, $timeout) {
        var onMissionTypesChangedCallbacks = [];
        var missionTypes = null;
        var missionTypesRequested = false;

        return {
            MissionType: MissionType,
            getMissionTypes: getMissionTypes,
            loadMissionTypes: loadMissionTypes,
            createFromResponse: createFromResponse,
            onMissionTypesChanged: onMissionTypesChanged
        };

        function MissionType(id, name) {
            this.id = id;
            this.name = name;

            Object.seal(this);
        }

        function getMissionTypes() {
            if(!missionTypesRequested) {
                loadMissionTypes();
            } else {
                return missionTypes;
            }
        }

        function createFromResponse(missionType) {
            if(missionType) {
                return new MissionType(
                    missionType['id'],
                    missionType['name']
                );
            }
        }

        function onMissionTypesChanged(callback) {
            onMissionTypesChangedCallbacks.push(callback);
        }

        function notifyMissionTypesChanged(missionTypes) {
            onMissionTypesChangedCallbacks.forEach(function(callback){
                callback(missionTypes);
            });
        }

        function loadMissionTypes() {
            missionTypesRequested = true;
            var url = Routing.generate('get_mission_types');
            return $http
                .get(url)
                .then(function(response){
                    missionTypes = response.data.map(function(missionType){
                        return createFromResponse(missionType);
                    });
                    notifyMissionTypesChanged(missionTypes);
                })
        }

    }