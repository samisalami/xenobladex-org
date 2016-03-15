<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20160315150501 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE xenobladex_equipupgrade_tier ADD equipupgrade_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE xenobladex_equipupgrade_tier ADD CONSTRAINT FK_5159CF3E46F09289 FOREIGN KEY (equipupgrade_id) REFERENCES equip_upgrade (id)');
        $this->addSql('CREATE INDEX IDX_5159CF3E46F09289 ON xenobladex_equipupgrade_tier (equipupgrade_id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE xenobladex_equipupgrade_tier DROP FOREIGN KEY FK_5159CF3E46F09289');
        $this->addSql('DROP INDEX IDX_5159CF3E46F09289 ON xenobladex_equipupgrade_tier');
        $this->addSql('ALTER TABLE xenobladex_equipupgrade_tier DROP equipupgrade_id');
    }
}
