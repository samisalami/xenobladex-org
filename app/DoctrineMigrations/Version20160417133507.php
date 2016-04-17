<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20160417133507 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE xenobladex_collectible DROP FOREIGN KEY FK_81DE3969FD41777');
        $this->addSql('DROP INDEX UNIQ_81DE3969FD41777 ON xenobladex_collectible');
        $this->addSql('ALTER TABLE xenobladex_collectible DROP collection_group_id');
        $this->addSql('ALTER TABLE xenobladex_equip_upgrade ADD alternative_name VARCHAR(255) NOT NULL');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE xenobladex_collectible ADD collection_group_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE xenobladex_collectible ADD CONSTRAINT FK_81DE3969FD41777 FOREIGN KEY (collection_group_id) REFERENCES xenobladex_collection_group (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_81DE3969FD41777 ON xenobladex_collectible (collection_group_id)');
        $this->addSql('ALTER TABLE xenobladex_equip_upgrade DROP alternative_name');
    }
}
