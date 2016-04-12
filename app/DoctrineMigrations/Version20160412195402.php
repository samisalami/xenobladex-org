<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20160412195402 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE xenobladex_equip_upgrade DROP material_small1_count, DROP material_small2_count, DROP material_small3_count, DROP material_large1_count, DROP material_large2_count, DROP material_large3_count');
        $this->addSql('ALTER TABLE xenobladex_equipupgrade_tier ADD description LONGTEXT NOT NULL, ADD material_count INT NOT NULL');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE xenobladex_equip_upgrade ADD material_small1_count INT NOT NULL, ADD material_small2_count INT NOT NULL, ADD material_small3_count INT NOT NULL, ADD material_large1_count INT NOT NULL, ADD material_large2_count INT NOT NULL, ADD material_large3_count INT NOT NULL');
        $this->addSql('ALTER TABLE xenobladex_equipupgrade_tier DROP description, DROP material_count');
    }
}
