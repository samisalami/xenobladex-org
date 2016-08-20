<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20160820190604 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE xenobladex_mapmarker_mission DROP FOREIGN KEY FK_EA7B0052BF396750');
        $this->addSql('ALTER TABLE xenobladex_mapmarker_monster DROP FOREIGN KEY FK_5E42349ABF396750');
        $this->addSql('ALTER TABLE xenobladex_mapmarker_person DROP FOREIGN KEY FK_427417FDBF396750');
        $this->addSql('DROP TABLE xenobladex_mapmarker');
        $this->addSql('DROP TABLE xenobladex_mapmarker_mission');
        $this->addSql('DROP TABLE xenobladex_mapmarker_monster');
        $this->addSql('DROP TABLE xenobladex_mapmarker_person');
        $this->addSql('ALTER TABLE xenobladex_mission ADD map_geo_json LONGTEXT NOT NULL');
        $this->addSql('ALTER TABLE xenobladex_monster ADD map_geo_json LONGTEXT NOT NULL');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE xenobladex_mapmarker (id INT AUTO_INCREMENT NOT NULL, map_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, x_coord VARCHAR(255) NOT NULL, y_coord VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, mapmarker_type VARCHAR(255) NOT NULL, INDEX IDX_F7FEC73C53C55F64 (map_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE xenobladex_mapmarker_mission (id INT NOT NULL, mission_id INT DEFAULT NULL, INDEX IDX_EA7B0052BE6CAE90 (mission_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE xenobladex_mapmarker_monster (id INT NOT NULL, monster_id INT DEFAULT NULL, INDEX IDX_5E42349AC5FF1223 (monster_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE xenobladex_mapmarker_person (id INT NOT NULL, person_id INT DEFAULT NULL, INDEX IDX_427417FD217BBB47 (person_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE xenobladex_mapmarker ADD CONSTRAINT FK_F7FEC73C53C55F64 FOREIGN KEY (map_id) REFERENCES xenobladex_map (id)');
        $this->addSql('ALTER TABLE xenobladex_mapmarker_mission ADD CONSTRAINT FK_EA7B0052BE6CAE90 FOREIGN KEY (mission_id) REFERENCES xenobladex_mission (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE xenobladex_mapmarker_mission ADD CONSTRAINT FK_EA7B0052BF396750 FOREIGN KEY (id) REFERENCES xenobladex_mapmarker (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE xenobladex_mapmarker_monster ADD CONSTRAINT FK_5E42349ABF396750 FOREIGN KEY (id) REFERENCES xenobladex_mapmarker (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE xenobladex_mapmarker_monster ADD CONSTRAINT FK_5E42349AC5FF1223 FOREIGN KEY (monster_id) REFERENCES xenobladex_monster (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE xenobladex_mapmarker_person ADD CONSTRAINT FK_427417FD217BBB47 FOREIGN KEY (person_id) REFERENCES xenobladex_person (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE xenobladex_mapmarker_person ADD CONSTRAINT FK_427417FDBF396750 FOREIGN KEY (id) REFERENCES xenobladex_mapmarker (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE xenobladex_mission DROP map_geo_json');
        $this->addSql('ALTER TABLE xenobladex_monster DROP map_geo_json');
    }
}
