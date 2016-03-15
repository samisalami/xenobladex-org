<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20160315160402 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE xenobladex_equipupgrade_tier_material_recipe (monster_id INT NOT NULL, material_recipe_id INT NOT NULL, INDEX IDX_6A4EFCDAC5FF1223 (monster_id), INDEX IDX_6A4EFCDA6146B8F4 (material_recipe_id), PRIMARY KEY(monster_id, material_recipe_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE material_recipe (id INT AUTO_INCREMENT NOT NULL, material_id INT DEFAULT NULL, count SMALLINT NOT NULL, INDEX IDX_4BBA3A0CE308AC6F (material_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE xenobladex_equipupgrade_tier_material_recipe ADD CONSTRAINT FK_6A4EFCDAC5FF1223 FOREIGN KEY (monster_id) REFERENCES xenobladex_equipupgrade_tier (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE xenobladex_equipupgrade_tier_material_recipe ADD CONSTRAINT FK_6A4EFCDA6146B8F4 FOREIGN KEY (material_recipe_id) REFERENCES material_recipe (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE material_recipe ADD CONSTRAINT FK_4BBA3A0CE308AC6F FOREIGN KEY (material_id) REFERENCES xenobladex_item_material (id)');
        $this->addSql('DROP TABLE xenobladex_equipupgrade_tier_material');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE xenobladex_equipupgrade_tier_material_recipe DROP FOREIGN KEY FK_6A4EFCDA6146B8F4');
        $this->addSql('CREATE TABLE xenobladex_equipupgrade_tier_material (monster_id INT NOT NULL, material_id INT NOT NULL, INDEX IDX_66940918C5FF1223 (monster_id), INDEX IDX_66940918E308AC6F (material_id), PRIMARY KEY(monster_id, material_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE xenobladex_equipupgrade_tier_material ADD CONSTRAINT FK_66940918C5FF1223 FOREIGN KEY (monster_id) REFERENCES xenobladex_equipupgrade_tier (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE xenobladex_equipupgrade_tier_material ADD CONSTRAINT FK_66940918E308AC6F FOREIGN KEY (material_id) REFERENCES xenobladex_item_material (id) ON DELETE CASCADE');
        $this->addSql('DROP TABLE xenobladex_equipupgrade_tier_material_recipe');
        $this->addSql('DROP TABLE material_recipe');
    }
}
