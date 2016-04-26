<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20160425155205 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE xenobladex_equipupgrade_tier ADD material1_id INT DEFAULT NULL, ADD material2_id INT DEFAULT NULL, ADD material3_id INT DEFAULT NULL, ADD material_individual TINYINT(1) NOT NULL');
        $this->addSql('ALTER TABLE xenobladex_equipupgrade_tier ADD CONSTRAINT FK_5159CF3EB8259F6 FOREIGN KEY (material1_id) REFERENCES xenobladex_item_material (id)');
        $this->addSql('ALTER TABLE xenobladex_equipupgrade_tier ADD CONSTRAINT FK_5159CF3E1937F618 FOREIGN KEY (material2_id) REFERENCES xenobladex_item_material (id)');
        $this->addSql('ALTER TABLE xenobladex_equipupgrade_tier ADD CONSTRAINT FK_5159CF3EA18B917D FOREIGN KEY (material3_id) REFERENCES xenobladex_item_material (id)');
        $this->addSql('CREATE INDEX IDX_5159CF3EB8259F6 ON xenobladex_equipupgrade_tier (material1_id)');
        $this->addSql('CREATE INDEX IDX_5159CF3E1937F618 ON xenobladex_equipupgrade_tier (material2_id)');
        $this->addSql('CREATE INDEX IDX_5159CF3EA18B917D ON xenobladex_equipupgrade_tier (material3_id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE xenobladex_equipupgrade_tier DROP FOREIGN KEY FK_5159CF3EB8259F6');
        $this->addSql('ALTER TABLE xenobladex_equipupgrade_tier DROP FOREIGN KEY FK_5159CF3E1937F618');
        $this->addSql('ALTER TABLE xenobladex_equipupgrade_tier DROP FOREIGN KEY FK_5159CF3EA18B917D');
        $this->addSql('DROP INDEX IDX_5159CF3EB8259F6 ON xenobladex_equipupgrade_tier');
        $this->addSql('DROP INDEX IDX_5159CF3E1937F618 ON xenobladex_equipupgrade_tier');
        $this->addSql('DROP INDEX IDX_5159CF3EA18B917D ON xenobladex_equipupgrade_tier');
        $this->addSql('ALTER TABLE xenobladex_equipupgrade_tier DROP material1_id, DROP material2_id, DROP material3_id, DROP material_individual');
    }
}
