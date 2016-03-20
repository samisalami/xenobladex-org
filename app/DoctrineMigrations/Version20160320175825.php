<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20160320175825 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE xenobladex_collectible DROP FOREIGN KEY FK_81DE3969FD41777');
        $this->addSql('DROP INDEX IDX_81DE3969FD41777 ON xenobladex_collectible');
        $this->addSql('ALTER TABLE xenobladex_collectible DROP collection_group_id, DROP collection_group_prio');
        $this->addSql('ALTER TABLE xenobladex_collection_group ADD collectible1_id INT DEFAULT NULL, ADD collectible2_id INT DEFAULT NULL, ADD collectible3_id INT DEFAULT NULL, ADD collectible4_id INT DEFAULT NULL, ADD collectible5_id INT DEFAULT NULL, ADD collectible6_id INT DEFAULT NULL, ADD collectible7_id INT DEFAULT NULL, ADD collectible8_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE xenobladex_collection_group ADD CONSTRAINT FK_783577D17D2A10F8 FOREIGN KEY (collectible1_id) REFERENCES xenobladex_collectible (id)');
        $this->addSql('ALTER TABLE xenobladex_collection_group ADD CONSTRAINT FK_783577D16F9FBF16 FOREIGN KEY (collectible2_id) REFERENCES xenobladex_collectible (id)');
        $this->addSql('ALTER TABLE xenobladex_collection_group ADD CONSTRAINT FK_783577D1D723D873 FOREIGN KEY (collectible3_id) REFERENCES xenobladex_collectible (id)');
        $this->addSql('ALTER TABLE xenobladex_collection_group ADD CONSTRAINT FK_783577D14AF4E0CA FOREIGN KEY (collectible4_id) REFERENCES xenobladex_collectible (id)');
        $this->addSql('ALTER TABLE xenobladex_collection_group ADD CONSTRAINT FK_783577D1F24887AF FOREIGN KEY (collectible5_id) REFERENCES xenobladex_collectible (id)');
        $this->addSql('ALTER TABLE xenobladex_collection_group ADD CONSTRAINT FK_783577D1E0FD2841 FOREIGN KEY (collectible6_id) REFERENCES xenobladex_collectible (id)');
        $this->addSql('ALTER TABLE xenobladex_collection_group ADD CONSTRAINT FK_783577D158414F24 FOREIGN KEY (collectible7_id) REFERENCES xenobladex_collectible (id)');
        $this->addSql('ALTER TABLE xenobladex_collection_group ADD CONSTRAINT FK_783577D1225F72 FOREIGN KEY (collectible8_id) REFERENCES xenobladex_collectible (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_783577D17D2A10F8 ON xenobladex_collection_group (collectible1_id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_783577D16F9FBF16 ON xenobladex_collection_group (collectible2_id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_783577D1D723D873 ON xenobladex_collection_group (collectible3_id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_783577D14AF4E0CA ON xenobladex_collection_group (collectible4_id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_783577D1F24887AF ON xenobladex_collection_group (collectible5_id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_783577D1E0FD2841 ON xenobladex_collection_group (collectible6_id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_783577D158414F24 ON xenobladex_collection_group (collectible7_id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_783577D1225F72 ON xenobladex_collection_group (collectible8_id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE xenobladex_collectible ADD collection_group_id INT DEFAULT NULL, ADD collection_group_prio SMALLINT NOT NULL');
        $this->addSql('ALTER TABLE xenobladex_collectible ADD CONSTRAINT FK_81DE3969FD41777 FOREIGN KEY (collection_group_id) REFERENCES xenobladex_collection_group (id)');
        $this->addSql('CREATE INDEX IDX_81DE3969FD41777 ON xenobladex_collectible (collection_group_id)');
        $this->addSql('ALTER TABLE xenobladex_collection_group DROP FOREIGN KEY FK_783577D17D2A10F8');
        $this->addSql('ALTER TABLE xenobladex_collection_group DROP FOREIGN KEY FK_783577D16F9FBF16');
        $this->addSql('ALTER TABLE xenobladex_collection_group DROP FOREIGN KEY FK_783577D1D723D873');
        $this->addSql('ALTER TABLE xenobladex_collection_group DROP FOREIGN KEY FK_783577D14AF4E0CA');
        $this->addSql('ALTER TABLE xenobladex_collection_group DROP FOREIGN KEY FK_783577D1F24887AF');
        $this->addSql('ALTER TABLE xenobladex_collection_group DROP FOREIGN KEY FK_783577D1E0FD2841');
        $this->addSql('ALTER TABLE xenobladex_collection_group DROP FOREIGN KEY FK_783577D158414F24');
        $this->addSql('ALTER TABLE xenobladex_collection_group DROP FOREIGN KEY FK_783577D1225F72');
        $this->addSql('DROP INDEX UNIQ_783577D17D2A10F8 ON xenobladex_collection_group');
        $this->addSql('DROP INDEX UNIQ_783577D16F9FBF16 ON xenobladex_collection_group');
        $this->addSql('DROP INDEX UNIQ_783577D1D723D873 ON xenobladex_collection_group');
        $this->addSql('DROP INDEX UNIQ_783577D14AF4E0CA ON xenobladex_collection_group');
        $this->addSql('DROP INDEX UNIQ_783577D1F24887AF ON xenobladex_collection_group');
        $this->addSql('DROP INDEX UNIQ_783577D1E0FD2841 ON xenobladex_collection_group');
        $this->addSql('DROP INDEX UNIQ_783577D158414F24 ON xenobladex_collection_group');
        $this->addSql('DROP INDEX UNIQ_783577D1225F72 ON xenobladex_collection_group');
        $this->addSql('ALTER TABLE xenobladex_collection_group DROP collectible1_id, DROP collectible2_id, DROP collectible3_id, DROP collectible4_id, DROP collectible5_id, DROP collectible6_id, DROP collectible7_id, DROP collectible8_id');
    }
}
