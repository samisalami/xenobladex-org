<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20151222152910 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE xenobladex_mission ADD person_id INT DEFAULT NULL, ADD person_unrelated VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE xenobladex_mission ADD CONSTRAINT FK_66A43CF4217BBB47 FOREIGN KEY (person_id) REFERENCES xenobladex_person (id)');
        $this->addSql('CREATE INDEX IDX_66A43CF4217BBB47 ON xenobladex_mission (person_id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE xenobladex_mission DROP FOREIGN KEY FK_66A43CF4217BBB47');
        $this->addSql('DROP INDEX IDX_66A43CF4217BBB47 ON xenobladex_mission');
        $this->addSql('ALTER TABLE xenobladex_mission DROP person_id, DROP person_unrelated');
    }
}
