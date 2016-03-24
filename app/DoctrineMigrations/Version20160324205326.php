<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20160324205326 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE xenobladex_item_resource (id INT NOT NULL, region VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE xenobladex_resource_recipe (id INT AUTO_INCREMENT NOT NULL, resource_id INT DEFAULT NULL, equip_upgrade_tier_id INT DEFAULT NULL, count SMALLINT NOT NULL, INDEX IDX_771D2A7E89329D25 (resource_id), INDEX IDX_771D2A7EF7F92D3B (equip_upgrade_tier_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE xenobladex_item_resource ADD CONSTRAINT FK_AEB3B834BF396750 FOREIGN KEY (id) REFERENCES xenobladex_item (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE xenobladex_resource_recipe ADD CONSTRAINT FK_771D2A7E89329D25 FOREIGN KEY (resource_id) REFERENCES xenobladex_item_resource (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE xenobladex_resource_recipe ADD CONSTRAINT FK_771D2A7EF7F92D3B FOREIGN KEY (equip_upgrade_tier_id) REFERENCES xenobladex_equipupgrade_tier (id) ON DELETE CASCADE');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE xenobladex_resource_recipe DROP FOREIGN KEY FK_771D2A7E89329D25');
        $this->addSql('DROP TABLE xenobladex_item_resource');
        $this->addSql('DROP TABLE xenobladex_resource_recipe');
    }
}
