<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20160120214400 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE xenobladex_monster_type_material DROP FOREIGN KEY FK_30ACDFDD672D3DAC');
        $this->addSql('ALTER TABLE xenobladex_monster_type_material DROP FOREIGN KEY FK_30ACDFDDE308AC6F');
        $this->addSql('ALTER TABLE xenobladex_monster_type_material ADD CONSTRAINT FK_6072C63B672D3DAC FOREIGN KEY (monster_type_id) REFERENCES xenobladex_monster_type (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE xenobladex_monster_type_material ADD CONSTRAINT FK_6072C63BE308AC6F FOREIGN KEY (material_id) REFERENCES xenobladex_item_material (id) ON DELETE CASCADE');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE xenobladex_monster_type_material DROP FOREIGN KEY FK_6072C63B672D3DAC');
        $this->addSql('ALTER TABLE xenobladex_monster_type_material DROP FOREIGN KEY FK_6072C63BE308AC6F');
        $this->addSql('ALTER TABLE xenobladex_monster_type_material ADD CONSTRAINT FK_30ACDFDD672D3DAC FOREIGN KEY (monster_type_id) REFERENCES xenobladex_monster_type (id)');
        $this->addSql('ALTER TABLE xenobladex_monster_type_material ADD CONSTRAINT FK_30ACDFDDE308AC6F FOREIGN KEY (material_id) REFERENCES xenobladex_item_material (id)');
    }
}
