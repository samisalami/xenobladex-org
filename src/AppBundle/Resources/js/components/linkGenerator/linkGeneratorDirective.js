'use strict';

angular.module('app')
    .directive('linkGenerator',['MaterialService', 'MissionService', 'MonsterService', 'CollectibleService', 'AttachmentService', function(MaterialService, MissionService, MonsterService, CollectibleService, AttachmentService) {
        return {
            restrict: 'EA',
            controller: function(){
                var that = this;
                that.baseUrl = 'https://www.xenobladex.org';
                init();

                function init() {
                    MissionService.onMissionsChanged(setMissions);
                    setMissions(MissionService.getMissions());

                    MonsterService.onMonstersChanged(setMonsters);
                    setMonsters(MonsterService.getMonsters());

                    CollectibleService.onCollectiblesChanged(setCollectibles);
                    setCollectibles(CollectibleService.getCollectibles());

                    MaterialService.onMaterialsChanged(setMaterials);
                    setMaterials(MaterialService.getMaterials());

                    AttachmentService.getAttachments(function(attachments){
                        setAttachmentData(attachments);
                    });
                }

                function setMissions(missions) {
                    that.missionsUrl = '/missionen/#mission-';
                    that.missions = missions;
                }

                function setMonsters(monsters) {
                    that.monstersUrl = '/kreaturen/#monster-';
                    that.monsters = monsters;
                }

                function setCollectibles(collectibles) {
                    that.collectiblesUrl = '/sammelitems/#sammelitem-';
                    that.collectibles = collectibles;
                }

                function setMaterials(materials) {
                    that.materialsUrl = '/material/#material-';
                    that.materials = materials;
                }

                function setAttachmentData(attachments) {
                    that.attachmentsUrl = '/xenobladex/attachment/';
                    that.attachments = attachments;
                }
            },
            controllerAs: 'vm'
        }
    }]);