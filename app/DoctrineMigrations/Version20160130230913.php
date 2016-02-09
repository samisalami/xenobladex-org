<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20160130230913 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE xenobladex_mapmarker_mission (id INT NOT NULL, mission_id INT DEFAULT NULL, INDEX IDX_EA7B0052BE6CAE90 (mission_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE xenobladex_mapmarker_mission ADD CONSTRAINT FK_EA7B0052BE6CAE90 FOREIGN KEY (mission_id) REFERENCES xenobladex_mission (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE xenobladex_mapmarker_mission ADD CONSTRAINT FK_EA7B0052BF396750 FOREIGN KEY (id) REFERENCES xenobladex_mapmarker (id) ON DELETE CASCADE');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE xenobladex_mapmarker_mission');
    }
}
