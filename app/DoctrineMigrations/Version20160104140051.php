<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20160104140051 extends AbstractMigration
{

    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE xenobladex_mapmarker_person (id INT NOT NULL, person_id INT DEFAULT NULL, INDEX IDX_427417FD217BBB47 (person_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE xenobladex_mapmarker_person ADD CONSTRAINT FK_427417FD217BBB47 FOREIGN KEY (person_id) REFERENCES xenobladex_person (id)');
        $this->addSql('ALTER TABLE xenobladex_mapmarker_person ADD CONSTRAINT FK_427417FDBF396750 FOREIGN KEY (id) REFERENCES xenobladex_mapmarker (id) ON DELETE CASCADE');
        $this->addSql('DELETE FROM xenobladex_mapmarker WHERE person_id like NULL');

        $queryBuilder = $this->connection->createQueryBuilder();
        $queryBuilder
            ->select('*')
            ->from('xenobladex_mapmarker', 'xenobladex_mapmarker');

        $mapmarkers = $queryBuilder->execute();

        foreach($mapmarkers as $mapmarker) {
            if($mapmarker['person_id']) {
                $this->addSql('INSERT INTO xenobladex_mapmarker_person (person_id, id) VALUES ('.$mapmarker['person_id'].', '.$mapmarker['id'].')');
            }
        }

        $this->addSql('ALTER TABLE xenobladex_mapmarker DROP FOREIGN KEY FK_F7FEC73C217BBB47');
        $this->addSql('DROP INDEX IDX_F7FEC73C217BBB47 ON xenobladex_mapmarker');
        $this->addSql('ALTER TABLE xenobladex_mapmarker ADD mapmarker_type VARCHAR(255) NOT NULL, DROP person_id');
        $this->addSql('UPDATE xenobladex_mapmarker SET mapmarker_type = "personmapmarker" WHERE mapmarker_type like ""');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE xenobladex_mapmarker_person');
        $this->addSql('ALTER TABLE xenobladex_mapmarker ADD person_id INT DEFAULT NULL, DROP mapmarker_type');
        $this->addSql('ALTER TABLE xenobladex_mapmarker ADD CONSTRAINT FK_F7FEC73C217BBB47 FOREIGN KEY (person_id) REFERENCES xenobladex_person (id)');
        $this->addSql('CREATE INDEX IDX_F7FEC73C217BBB47 ON xenobladex_mapmarker (person_id)');
    }
}
