'use strict';

angular.module('app')
    .factory('MissionService', MissionService);

    MissionService.$inject = ['$http', '$timeout', 'MissionTypeService'];

    function MissionService($http, $timeout, MissionTypeService) {
        var onMissionsChangedCallbacks = [];
        var missions = null;
        var missionsRequested = false;

        return {
            Mission: Mission,
            getMissions: getMissions,
            loadMissions: loadMissions,
            addMission: addMission,
            updateMission: updateMission,
            deleteMission: deleteMission,
            onMissionsChanged: onMissionsChanged
        };

        function Mission(
            id,
            name,
            description,
            location_note,
            conditions,
            tasks,
            solution,
            rewards,
            mission_type,
            //person,
            person_unrelated,
            has_person,
            target_area,
            sidejob_type,
            difficulty,
            blade_level,
            chapter)
        {
            this.id = id;
            this.name = name;
            this.description = description;
            this.location_note = location_note;
            this.conditions = conditions;
            this.tasks = tasks;
            this.solution = solution;
            this.rewards = rewards;
            this.mission_type = mission_type;
            //this.person = person;
            this.person_unrelated = person_unrelated;
            this.has_person = has_person;
            this.target_area = target_area;
            this.sidejob_type = sidejob_type;
            this.difficulty = difficulty;
            this.blade_level = blade_level;
            this.chapter = chapter;

            Object.seal(this);
        }

        function getMissions() {
            if(!missionsRequested) {
                loadMissions();
            } else {
                return missions;
            }
        }

        function createFromResponse(mission) {
            if (mission) {
                return new Mission(
                    mission['id'],
                    mission['name'],
                    mission['description'],
                    mission['location_note'],
                    mission['conditions'],
                    mission['tasks'],
                    mission['solution'],
                    mission['rewards'],
                    MissionTypeService.createFromResponse(mission['mission_type']),
                    //PersonService.create(mission['person']),
                    //mission['person'],
                    mission['person_unrelated'],
                    mission['has_person'],
                    mission['target_area'],
                    mission['sidejob_type'],
                    mission['difficulty'],
                    mission['blade_level'],
                    mission['chapter']
                );
            }

            return {};
        }

        function onMissionsChanged(callback) {
            onMissionsChangedCallbacks.push(callback);
        }

        function notifyMissionsChanged(missions) {
            onMissionsChangedCallbacks.forEach(function(callback){
               callback(missions);
            });
        }

        function loadMissions() {
            missionsRequested = true;
            var url = Routing.generate('get_missions');
            return $http
                .get(url)
                .then(function(response){
                    missions = response.data.map(function(mission){
                        return createFromResponse(mission);
                    });
                    notifyMissionsChanged(missions);
                })
        }

        function addMission(mission) {
            var url = Routing.generate('add_mission');
            return $http.post(url, mission)
                .then(function(response){
                    missions = response.data.map(function(mission){
                        return createFromResponse(mission);
                    });
                    notifyMissionsChanged(missions);
                });
        }

        function updateMission(mission) {
            var url = Routing.generate('update_mission', {id: mission.id});
            return $http.put(url, mission)
                .then(function(response){
                    missions = response.data.map(function(mission){
                        return createFromResponse(mission);
                    });
                    notifyMissionsChanged(missions);
                });
        }

        function deleteMission(mission) {
            var url = Routing.generate('delete_mission', {id: mission.id});
            return $http.delete(url)
                .then(function(response){
                    missions = response.data.map(function(mission){
                        return createFromResponse(mission);
                    });
                    notifyMissionsChanged(missions);
                });
        }
    }