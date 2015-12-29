<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20151229014632 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE xenobladex_mapmarker (id INT AUTO_INCREMENT NOT NULL, map_id INT DEFAULT NULL, person_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, x_coord VARCHAR(255) NOT NULL, y_coord VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, INDEX IDX_F7FEC73C53C55F64 (map_id), INDEX IDX_F7FEC73C217BBB47 (person_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE xenobladex_mapmarker ADD CONSTRAINT FK_F7FEC73C53C55F64 FOREIGN KEY (map_id) REFERENCES xenobladex_map (id)');
        $this->addSql('ALTER TABLE xenobladex_mapmarker ADD CONSTRAINT FK_F7FEC73C217BBB47 FOREIGN KEY (person_id) REFERENCES xenobladex_person (id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE xenobladex_mapmarker');
    }
}
