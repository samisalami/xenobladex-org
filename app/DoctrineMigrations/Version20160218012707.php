<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20160218012707 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE xenobladex_mission CHANGE name name VARCHAR(255) DEFAULT NULL, CHANGE description description LONGTEXT DEFAULT NULL, CHANGE tasks tasks LONGTEXT DEFAULT NULL, CHANGE solution solution LONGTEXT DEFAULT NULL, CHANGE locationNote locationNote LONGTEXT DEFAULT NULL, CHANGE conditions conditions LONGTEXT DEFAULT NULL, CHANGE rewards rewards LONGTEXT DEFAULT NULL, CHANGE person_unrelated person_unrelated VARCHAR(255) DEFAULT NULL, CHANGE target_area target_area VARCHAR(255) DEFAULT NULL, CHANGE sidejob_type sidejob_type VARCHAR(255) DEFAULT NULL');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE xenobladex_mission CHANGE name name VARCHAR(255) NOT NULL, CHANGE description description LONGTEXT NOT NULL, CHANGE locationNote locationNote LONGTEXT NOT NULL, CHANGE conditions conditions LONGTEXT NOT NULL, CHANGE tasks tasks LONGTEXT NOT NULL, CHANGE solution solution LONGTEXT NOT NULL, CHANGE rewards rewards LONGTEXT NOT NULL, CHANGE person_unrelated person_unrelated VARCHAR(255) NOT NULL, CHANGE target_area target_area VARCHAR(255) NOT NULL, CHANGE sidejob_type sidejob_type VARCHAR(255) NOT NULL');
    }
}
