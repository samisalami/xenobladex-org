<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20160122152321 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE xenobladex_mapmarker_person DROP FOREIGN KEY FK_427417FD217BBB47');
        $this->addSql('ALTER TABLE xenobladex_mapmarker_person ADD CONSTRAINT FK_427417FD217BBB47 FOREIGN KEY (person_id) REFERENCES xenobladex_person (id) ON DELETE CASCADE');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE xenobladex_mapmarker_person DROP FOREIGN KEY FK_427417FD217BBB47');
        $this->addSql('ALTER TABLE xenobladex_mapmarker_person ADD CONSTRAINT FK_427417FD217BBB47 FOREIGN KEY (person_id) REFERENCES xenobladex_person (id)');
    }
}
