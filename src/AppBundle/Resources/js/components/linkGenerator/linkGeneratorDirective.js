'use strict';

angular.module('app')
    .directive('linkGenerator',['MaterialService', 'MissionService', 'MonsterService', 'CollectibleService', 'AttachmentService', 'EquipUpgradeService', function(MaterialService, MissionService, MonsterService, CollectibleService, AttachmentService, EquipUpgradeService) {
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

                    EquipUpgradeService.onEquipUpgradesChanged(setEquipUpgrades);
                    setEquipUpgrades(EquipUpgradeService.getEquipUpgrades());

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

                function setEquipUpgrades(equipUpgrades) {
                    that.equipUpgradesUrl = '/erweiterungen/#equipUpgrade-';
                    that.equipUpgrades = equipUpgrades;
                }

                function setAttachmentData(attachments) {
                    that.attachmentsUrl = '/xenobladex/attachment/';
                    that.attachments = attachments;
                }
            },
            controllerAs: 'vm'
        }
    }]);