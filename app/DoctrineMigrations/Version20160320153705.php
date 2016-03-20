<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20160320153705 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE xenobladex_collection_category (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, prio SMALLINT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE xenobladex_collectible ADD collection_group_id INT DEFAULT NULL, ADD collection_group_prio SMALLINT NOT NULL');
        $this->addSql('ALTER TABLE xenobladex_collectible ADD CONSTRAINT FK_81DE3969FD41777 FOREIGN KEY (collection_group_id) REFERENCES xenobladex_collection_group (id)');
        $this->addSql('CREATE INDEX IDX_81DE3969FD41777 ON xenobladex_collectible (collection_group_id)');
        $this->addSql('ALTER TABLE xenobladex_collection_group ADD collection_id INT DEFAULT NULL, ADD collection_category_id INT DEFAULT NULL, DROP name');
        $this->addSql('ALTER TABLE xenobladex_collection_group ADD CONSTRAINT FK_783577D1514956FD FOREIGN KEY (collection_id) REFERENCES xenobladex_collection (id)');
        $this->addSql('ALTER TABLE xenobladex_collection_group ADD CONSTRAINT FK_783577D18EEC0163 FOREIGN KEY (collection_category_id) REFERENCES xenobladex_collection_category (id)');
        $this->addSql('CREATE INDEX IDX_783577D1514956FD ON xenobladex_collection_group (collection_id)');
        $this->addSql('CREATE INDEX IDX_783577D18EEC0163 ON xenobladex_collection_group (collection_category_id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE xenobladex_collection_group DROP FOREIGN KEY FK_783577D18EEC0163');
        $this->addSql('DROP TABLE xenobladex_collection_category');
        $this->addSql('ALTER TABLE xenobladex_collectible DROP FOREIGN KEY FK_81DE3969FD41777');
        $this->addSql('DROP INDEX IDX_81DE3969FD41777 ON xenobladex_collectible');
        $this->addSql('ALTER TABLE xenobladex_collectible DROP collection_group_id, DROP collection_group_prio');
        $this->addSql('DROP INDEX IDX_783577D1514956FD ON xenobladex_collection_group');
        $this->addSql('DROP INDEX IDX_783577D18EEC0163 ON xenobladex_collection_group');
        $this->addSql('ALTER TABLE xenobladex_collection_group ADD name VARCHAR(255) NOT NULL, DROP collection_id, DROP collection_category_id');
    }
}
