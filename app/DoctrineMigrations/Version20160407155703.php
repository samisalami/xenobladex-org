<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20160407155703 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE xenobladex_equipupgrade_tier ADD material3_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE xenobladex_equipupgrade_tier ADD CONSTRAINT FK_5159CF3EA18B917D FOREIGN KEY (material3_id) REFERENCES xenobladex_item_material (id)');
        $this->addSql('CREATE INDEX IDX_5159CF3EA18B917D ON xenobladex_equipupgrade_tier (material3_id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE xenobladex_equipupgrade_tier DROP FOREIGN KEY FK_5159CF3EA18B917D');
        $this->addSql('DROP INDEX IDX_5159CF3EA18B917D ON xenobladex_equipupgrade_tier');
        $this->addSql('ALTER TABLE xenobladex_equipupgrade_tier DROP material3_id');
    }
}
