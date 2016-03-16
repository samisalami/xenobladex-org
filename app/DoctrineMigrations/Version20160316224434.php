<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20160316224434 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');
        $this->addSql('RENAME TABLE equip_upgrade TO xenobladex_equip_upgrade');
        $this->addSql('RENAME TABLE equip_upgrade_category TO xenobladex_equip_upgrade_category');
        $this->addSql('RENAME TABLE material_recipe TO xenobladex_material_recipe');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE xenobladex_equipupgrade_tier DROP FOREIGN KEY FK_5159CF3E46F09289');
        $this->addSql('ALTER TABLE xenobladex_equip_upgrade DROP FOREIGN KEY FK_29403E6DA4C12EC6');
        $this->addSql('CREATE TABLE equip_upgrade (id INT AUTO_INCREMENT NOT NULL, equip_upgrade_category_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, INDEX IDX_576FBA84A4C12EC6 (equip_upgrade_category_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE equip_upgrade_category (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, type VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE material_recipe (id INT AUTO_INCREMENT NOT NULL, material_id INT DEFAULT NULL, equip_upgrade_tier_id INT DEFAULT NULL, count SMALLINT NOT NULL, INDEX IDX_4BBA3A0CE308AC6F (material_id), INDEX IDX_4BBA3A0CF7F92D3B (equip_upgrade_tier_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE equip_upgrade ADD CONSTRAINT FK_576FBA84A4C12EC6 FOREIGN KEY (equip_upgrade_category_id) REFERENCES equip_upgrade_category (id)');
        $this->addSql('ALTER TABLE material_recipe ADD CONSTRAINT FK_4BBA3A0CE308AC6F FOREIGN KEY (material_id) REFERENCES xenobladex_item_material (id)');
        $this->addSql('ALTER TABLE material_recipe ADD CONSTRAINT FK_4BBA3A0CF7F92D3B FOREIGN KEY (equip_upgrade_tier_id) REFERENCES xenobladex_equipupgrade_tier (id)');
        $this->addSql('DROP TABLE xenobladex_equip_upgrade');
        $this->addSql('DROP TABLE xenobladex_equip_upgrade_category');
        $this->addSql('DROP TABLE xenobladex_material_recipe');
        $this->addSql('ALTER TABLE xenobladex_equipupgrade_tier DROP FOREIGN KEY FK_5159CF3E46F09289');
        $this->addSql('ALTER TABLE xenobladex_equipupgrade_tier ADD CONSTRAINT FK_5159CF3E46F09289 FOREIGN KEY (equipupgrade_id) REFERENCES equip_upgrade (id)');
    }
}
