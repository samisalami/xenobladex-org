<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20160411201319 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE xenobladex_equip_upgrade ADD material_small1_id INT DEFAULT NULL, ADD material_small2_id INT DEFAULT NULL, ADD material_small3_id INT DEFAULT NULL, ADD material_large1_id INT DEFAULT NULL, ADD material_large2_id INT DEFAULT NULL, ADD material_large3_id INT DEFAULT NULL, ADD material_small1_count INT NOT NULL, ADD material_small2_count INT NOT NULL, ADD material_small3_count INT NOT NULL, ADD material_large1_count INT NOT NULL, ADD material_large2_count INT NOT NULL, ADD material_large3_count INT NOT NULL');
        $this->addSql('ALTER TABLE xenobladex_equip_upgrade ADD CONSTRAINT FK_29403E6D83F5D5EE FOREIGN KEY (material_small1_id) REFERENCES xenobladex_item_material (id)');
        $this->addSql('ALTER TABLE xenobladex_equip_upgrade ADD CONSTRAINT FK_29403E6D91407A00 FOREIGN KEY (material_small2_id) REFERENCES xenobladex_item_material (id)');
        $this->addSql('ALTER TABLE xenobladex_equip_upgrade ADD CONSTRAINT FK_29403E6D29FC1D65 FOREIGN KEY (material_small3_id) REFERENCES xenobladex_item_material (id)');
        $this->addSql('ALTER TABLE xenobladex_equip_upgrade ADD CONSTRAINT FK_29403E6D96C259E0 FOREIGN KEY (material_large1_id) REFERENCES xenobladex_item_material (id)');
        $this->addSql('ALTER TABLE xenobladex_equip_upgrade ADD CONSTRAINT FK_29403E6D8477F60E FOREIGN KEY (material_large2_id) REFERENCES xenobladex_item_material (id)');
        $this->addSql('ALTER TABLE xenobladex_equip_upgrade ADD CONSTRAINT FK_29403E6D3CCB916B FOREIGN KEY (material_large3_id) REFERENCES xenobladex_item_material (id)');
        $this->addSql('CREATE INDEX IDX_29403E6D83F5D5EE ON xenobladex_equip_upgrade (material_small1_id)');
        $this->addSql('CREATE INDEX IDX_29403E6D91407A00 ON xenobladex_equip_upgrade (material_small2_id)');
        $this->addSql('CREATE INDEX IDX_29403E6D29FC1D65 ON xenobladex_equip_upgrade (material_small3_id)');
        $this->addSql('CREATE INDEX IDX_29403E6D96C259E0 ON xenobladex_equip_upgrade (material_large1_id)');
        $this->addSql('CREATE INDEX IDX_29403E6D8477F60E ON xenobladex_equip_upgrade (material_large2_id)');
        $this->addSql('CREATE INDEX IDX_29403E6D3CCB916B ON xenobladex_equip_upgrade (material_large3_id)');
        $this->addSql('ALTER TABLE xenobladex_equipupgrade_tier DROP FOREIGN KEY FK_5159CF3E1937F618');
        $this->addSql('ALTER TABLE xenobladex_equipupgrade_tier DROP FOREIGN KEY FK_5159CF3E9DE1CB49');
        $this->addSql('ALTER TABLE xenobladex_equipupgrade_tier DROP FOREIGN KEY FK_5159CF3EA18B917D');
        $this->addSql('ALTER TABLE xenobladex_equipupgrade_tier DROP FOREIGN KEY FK_5159CF3EB8259F6');
        $this->addSql('DROP INDEX IDX_5159CF3EB8259F6 ON xenobladex_equipupgrade_tier');
        $this->addSql('DROP INDEX IDX_5159CF3E1937F618 ON xenobladex_equipupgrade_tier');
        $this->addSql('DROP INDEX IDX_5159CF3E9DE1CB49 ON xenobladex_equipupgrade_tier');
        $this->addSql('DROP INDEX IDX_5159CF3EA18B917D ON xenobladex_equipupgrade_tier');
        $this->addSql('ALTER TABLE xenobladex_equipupgrade_tier ADD resource_id INT DEFAULT NULL, ADD resource_count INT NOT NULL, DROP material2_id, DROP resource1_id, DROP material3_id, DROP material1_id, DROP material1_count, DROP material2_count, DROP material3_count, DROP resource1_count');
        $this->addSql('ALTER TABLE xenobladex_equipupgrade_tier ADD CONSTRAINT FK_5159CF3E89329D25 FOREIGN KEY (resource_id) REFERENCES xenobladex_item_resource (id)');
        $this->addSql('CREATE INDEX IDX_5159CF3E89329D25 ON xenobladex_equipupgrade_tier (resource_id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE xenobladex_equip_upgrade DROP FOREIGN KEY FK_29403E6D83F5D5EE');
        $this->addSql('ALTER TABLE xenobladex_equip_upgrade DROP FOREIGN KEY FK_29403E6D91407A00');
        $this->addSql('ALTER TABLE xenobladex_equip_upgrade DROP FOREIGN KEY FK_29403E6D29FC1D65');
        $this->addSql('ALTER TABLE xenobladex_equip_upgrade DROP FOREIGN KEY FK_29403E6D96C259E0');
        $this->addSql('ALTER TABLE xenobladex_equip_upgrade DROP FOREIGN KEY FK_29403E6D8477F60E');
        $this->addSql('ALTER TABLE xenobladex_equip_upgrade DROP FOREIGN KEY FK_29403E6D3CCB916B');
        $this->addSql('DROP INDEX IDX_29403E6D83F5D5EE ON xenobladex_equip_upgrade');
        $this->addSql('DROP INDEX IDX_29403E6D91407A00 ON xenobladex_equip_upgrade');
        $this->addSql('DROP INDEX IDX_29403E6D29FC1D65 ON xenobladex_equip_upgrade');
        $this->addSql('DROP INDEX IDX_29403E6D96C259E0 ON xenobladex_equip_upgrade');
        $this->addSql('DROP INDEX IDX_29403E6D8477F60E ON xenobladex_equip_upgrade');
        $this->addSql('DROP INDEX IDX_29403E6D3CCB916B ON xenobladex_equip_upgrade');
        $this->addSql('ALTER TABLE xenobladex_equip_upgrade DROP material_small1_id, DROP material_small2_id, DROP material_small3_id, DROP material_large1_id, DROP material_large2_id, DROP material_large3_id, DROP material_small1_count, DROP material_small2_count, DROP material_small3_count, DROP material_large1_count, DROP material_large2_count, DROP material_large3_count');
        $this->addSql('ALTER TABLE xenobladex_equipupgrade_tier DROP FOREIGN KEY FK_5159CF3E89329D25');
        $this->addSql('DROP INDEX IDX_5159CF3E89329D25 ON xenobladex_equipupgrade_tier');
        $this->addSql('ALTER TABLE xenobladex_equipupgrade_tier ADD resource1_id INT DEFAULT NULL, ADD material3_id INT DEFAULT NULL, ADD material1_id INT DEFAULT NULL, ADD material2_count INT NOT NULL, ADD material3_count INT NOT NULL, ADD resource1_count INT NOT NULL, CHANGE resource_id material2_id INT DEFAULT NULL, CHANGE resource_count material1_count INT NOT NULL');
        $this->addSql('ALTER TABLE xenobladex_equipupgrade_tier ADD CONSTRAINT FK_5159CF3E1937F618 FOREIGN KEY (material2_id) REFERENCES xenobladex_item_material (id)');
        $this->addSql('ALTER TABLE xenobladex_equipupgrade_tier ADD CONSTRAINT FK_5159CF3E9DE1CB49 FOREIGN KEY (resource1_id) REFERENCES xenobladex_item_resource (id)');
        $this->addSql('ALTER TABLE xenobladex_equipupgrade_tier ADD CONSTRAINT FK_5159CF3EA18B917D FOREIGN KEY (material3_id) REFERENCES xenobladex_item_material (id)');
        $this->addSql('ALTER TABLE xenobladex_equipupgrade_tier ADD CONSTRAINT FK_5159CF3EB8259F6 FOREIGN KEY (material1_id) REFERENCES xenobladex_item_material (id)');
        $this->addSql('CREATE INDEX IDX_5159CF3EB8259F6 ON xenobladex_equipupgrade_tier (material1_id)');
        $this->addSql('CREATE INDEX IDX_5159CF3E1937F618 ON xenobladex_equipupgrade_tier (material2_id)');
        $this->addSql('CREATE INDEX IDX_5159CF3E9DE1CB49 ON xenobladex_equipupgrade_tier (resource1_id)');
        $this->addSql('CREATE INDEX IDX_5159CF3EA18B917D ON xenobladex_equipupgrade_tier (material3_id)');
    }
}
