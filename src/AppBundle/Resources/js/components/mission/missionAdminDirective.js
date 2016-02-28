'use strict';

angular.module('app')
    .directive('missionAdmin',['MissionService', 'MissionTypeService','SideJobTypeService', 'PersonService', 'mapService', 'flashService', '$filter', function(MissionService, MissionTypeService, RegionService, PersonService, mapService, flashService, $filter) {
        return {
            restrict: 'E',
            replace: true,
            controller: ['$scope',function($scope) {
                var that = this;
                init();

                function init() {
                    MissionService.onMissionsChanged(setMissions);
                    MissionService.onMissionDeleted(setDeletedMission);
                    setMissions(MissionService.getMissions());

                    that.newMission = MissionService.Mission;
                }

                function setMissions(missions) {
                    that.missions = missions;
                }

                function setDeletedMission(mission) {
                    that.deletedMission = mission;
                    delete that.deletedMission.id;
                }

                that.addDeletedMission = function() {
                    MissionService.addMission(that.deletedMission);
                    delete that.deletedMission;
                };
            }],
            controllerAs: 'vm'
        }
    }]);