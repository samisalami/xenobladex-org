<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20160316214506 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE xenobladex_equipupgrade_tier_material_recipe');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE xenobladex_equipupgrade_tier_material_recipe (monster_id INT NOT NULL, material_recipe_id INT NOT NULL, INDEX IDX_6A4EFCDAC5FF1223 (monster_id), INDEX IDX_6A4EFCDA6146B8F4 (material_recipe_id), PRIMARY KEY(monster_id, material_recipe_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE xenobladex_equipupgrade_tier_material_recipe ADD CONSTRAINT FK_6A4EFCDA6146B8F4 FOREIGN KEY (material_recipe_id) REFERENCES material_recipe (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE xenobladex_equipupgrade_tier_material_recipe ADD CONSTRAINT FK_6A4EFCDAC5FF1223 FOREIGN KEY (monster_id) REFERENCES xenobladex_equipupgrade_tier (id) ON DELETE CASCADE');
    }
}
