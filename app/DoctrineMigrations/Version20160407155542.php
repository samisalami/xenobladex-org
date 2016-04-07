<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20160407155542 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE xenobladex_material_recipe');
        $this->addSql('DROP TABLE xenobladex_resource_recipe');
        $this->addSql('ALTER TABLE xenobladex_equipupgrade_tier ADD material1_id INT DEFAULT NULL, ADD material2_id INT DEFAULT NULL, ADD resource1_id INT DEFAULT NULL, ADD material1_count INT NOT NULL, ADD material2_count INT NOT NULL, ADD material3_count INT NOT NULL, ADD resource1_count INT NOT NULL');
        $this->addSql('ALTER TABLE xenobladex_equipupgrade_tier ADD CONSTRAINT FK_5159CF3EB8259F6 FOREIGN KEY (material1_id) REFERENCES xenobladex_item_material (id)');
        $this->addSql('ALTER TABLE xenobladex_equipupgrade_tier ADD CONSTRAINT FK_5159CF3E1937F618 FOREIGN KEY (material2_id) REFERENCES xenobladex_item_material (id)');
        $this->addSql('ALTER TABLE xenobladex_equipupgrade_tier ADD CONSTRAINT FK_5159CF3E9DE1CB49 FOREIGN KEY (resource1_id) REFERENCES xenobladex_item_resource (id)');
        $this->addSql('CREATE INDEX IDX_5159CF3EB8259F6 ON xenobladex_equipupgrade_tier (material1_id)');
        $this->addSql('CREATE INDEX IDX_5159CF3E1937F618 ON xenobladex_equipupgrade_tier (material2_id)');
        $this->addSql('CREATE INDEX IDX_5159CF3E9DE1CB49 ON xenobladex_equipupgrade_tier (resource1_id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE xenobladex_material_recipe (id INT AUTO_INCREMENT NOT NULL, material_id INT DEFAULT NULL, equip_upgrade_tier_id INT DEFAULT NULL, count SMALLINT NOT NULL, INDEX IDX_4BBA3A0CE308AC6F (material_id), INDEX IDX_4BBA3A0CF7F92D3B (equip_upgrade_tier_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE xenobladex_resource_recipe (id INT AUTO_INCREMENT NOT NULL, resource_id INT DEFAULT NULL, equip_upgrade_tier_id INT DEFAULT NULL, count SMALLINT NOT NULL, INDEX IDX_771D2A7E89329D25 (resource_id), INDEX IDX_771D2A7EF7F92D3B (equip_upgrade_tier_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE xenobladex_material_recipe ADD CONSTRAINT FK_2ED34BBFE308AC6F FOREIGN KEY (material_id) REFERENCES xenobladex_item_material (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE xenobladex_material_recipe ADD CONSTRAINT FK_2ED34BBFF7F92D3B FOREIGN KEY (equip_upgrade_tier_id) REFERENCES xenobladex_equipupgrade_tier (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE xenobladex_resource_recipe ADD CONSTRAINT FK_771D2A7E89329D25 FOREIGN KEY (resource_id) REFERENCES xenobladex_item_resource (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE xenobladex_resource_recipe ADD CONSTRAINT FK_771D2A7EF7F92D3B FOREIGN KEY (equip_upgrade_tier_id) REFERENCES xenobladex_equipupgrade_tier (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE xenobladex_equipupgrade_tier DROP FOREIGN KEY FK_5159CF3EB8259F6');
        $this->addSql('ALTER TABLE xenobladex_equipupgrade_tier DROP FOREIGN KEY FK_5159CF3E1937F618');
        $this->addSql('ALTER TABLE xenobladex_equipupgrade_tier DROP FOREIGN KEY FK_5159CF3E9DE1CB49');
        $this->addSql('DROP INDEX IDX_5159CF3EB8259F6 ON xenobladex_equipupgrade_tier');
        $this->addSql('DROP INDEX IDX_5159CF3E1937F618 ON xenobladex_equipupgrade_tier');
        $this->addSql('DROP INDEX IDX_5159CF3E9DE1CB49 ON xenobladex_equipupgrade_tier');
        $this->addSql('ALTER TABLE xenobladex_equipupgrade_tier DROP material1_id, DROP material2_id, DROP resource1_id, DROP material1_count, DROP material2_count, DROP material3_count, DROP resource1_count');
    }
}
