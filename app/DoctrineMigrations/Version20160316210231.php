<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20160316210231 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE material_recipe ADD equip_upgrade_tier_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE material_recipe ADD CONSTRAINT FK_4BBA3A0CF7F92D3B FOREIGN KEY (equip_upgrade_tier_id) REFERENCES xenobladex_equipupgrade_tier (id)');
        $this->addSql('CREATE INDEX IDX_4BBA3A0CF7F92D3B ON material_recipe (equip_upgrade_tier_id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE material_recipe DROP FOREIGN KEY FK_4BBA3A0CF7F92D3B');
        $this->addSql('DROP INDEX IDX_4BBA3A0CF7F92D3B ON material_recipe');
        $this->addSql('ALTER TABLE material_recipe DROP equip_upgrade_tier_id');
    }
}
