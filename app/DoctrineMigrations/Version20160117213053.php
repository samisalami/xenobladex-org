<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20160117213053 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE xenobladex_item (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, rarity VARCHAR(255) NOT NULL, credit_cost SMALLINT NOT NULL, ticket_cost SMALLINT NOT NULL, body_part VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, item_type VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE xenobladex_item_material (id INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE xenobladex_monster_type (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE monster_type_material (monster_type_id INT NOT NULL, material_id INT NOT NULL, INDEX IDX_30ACDFDD672D3DAC (monster_type_id), INDEX IDX_30ACDFDDE308AC6F (material_id), PRIMARY KEY(monster_type_id, material_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE xenobladex_item_material ADD CONSTRAINT FK_6E9C39B7BF396750 FOREIGN KEY (id) REFERENCES xenobladex_item (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE monster_type_material ADD CONSTRAINT FK_30ACDFDD672D3DAC FOREIGN KEY (monster_type_id) REFERENCES xenobladex_monster_type (id)');
        $this->addSql('ALTER TABLE monster_type_material ADD CONSTRAINT FK_30ACDFDDE308AC6F FOREIGN KEY (material_id) REFERENCES xenobladex_item_material (id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE xenobladex_item_material DROP FOREIGN KEY FK_6E9C39B7BF396750');
        $this->addSql('ALTER TABLE monster_type_material DROP FOREIGN KEY FK_30ACDFDDE308AC6F');
        $this->addSql('ALTER TABLE monster_type_material DROP FOREIGN KEY FK_30ACDFDD672D3DAC');
        $this->addSql('DROP TABLE xenobladex_item');
        $this->addSql('DROP TABLE xenobladex_item_material');
        $this->addSql('DROP TABLE xenobladex_monster_type');
        $this->addSql('DROP TABLE monster_type_material');
    }
}
