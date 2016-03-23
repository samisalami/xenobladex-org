<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20160323212340 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE xenobladex_collection_group DROP FOREIGN KEY FK_783577D1514956FD');
        $this->addSql('ALTER TABLE xenobladex_collection_group ADD CONSTRAINT FK_783577D1514956FD FOREIGN KEY (collection_id) REFERENCES xenobladex_collection (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE xenobladex_equipupgrade_tier DROP FOREIGN KEY FK_5159CF3E46F09289');
        $this->addSql('ALTER TABLE xenobladex_equipupgrade_tier ADD CONSTRAINT FK_5159CF3E46F09289 FOREIGN KEY (equipupgrade_id) REFERENCES xenobladex_equip_upgrade (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE xenobladex_material_recipe DROP FOREIGN KEY FK_4BBA3A0CE308AC6F');
        $this->addSql('ALTER TABLE xenobladex_material_recipe DROP FOREIGN KEY FK_4BBA3A0CF7F92D3B');
        $this->addSql('ALTER TABLE xenobladex_material_recipe ADD CONSTRAINT FK_2ED34BBFE308AC6F FOREIGN KEY (material_id) REFERENCES xenobladex_item_material (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE xenobladex_material_recipe ADD CONSTRAINT FK_2ED34BBFF7F92D3B FOREIGN KEY (equip_upgrade_tier_id) REFERENCES xenobladex_equipupgrade_tier (id) ON DELETE CASCADE');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE xenobladex_collection_group DROP FOREIGN KEY FK_783577D1514956FD');
        $this->addSql('ALTER TABLE xenobladex_collection_group ADD CONSTRAINT FK_783577D1514956FD FOREIGN KEY (collection_id) REFERENCES xenobladex_collection (id)');
        $this->addSql('ALTER TABLE xenobladex_equipupgrade_tier DROP FOREIGN KEY FK_5159CF3E46F09289');
        $this->addSql('ALTER TABLE xenobladex_equipupgrade_tier ADD CONSTRAINT FK_5159CF3E46F09289 FOREIGN KEY (equipupgrade_id) REFERENCES xenobladex_equip_upgrade (id)');
        $this->addSql('ALTER TABLE xenobladex_material_recipe DROP FOREIGN KEY FK_2ED34BBFE308AC6F');
        $this->addSql('ALTER TABLE xenobladex_material_recipe DROP FOREIGN KEY FK_2ED34BBFF7F92D3B');
        $this->addSql('ALTER TABLE xenobladex_material_recipe ADD CONSTRAINT FK_4BBA3A0CE308AC6F FOREIGN KEY (material_id) REFERENCES xenobladex_item_material (id)');
        $this->addSql('ALTER TABLE xenobladex_material_recipe ADD CONSTRAINT FK_4BBA3A0CF7F92D3B FOREIGN KEY (equip_upgrade_tier_id) REFERENCES xenobladex_equipupgrade_tier (id)');
    }
}
