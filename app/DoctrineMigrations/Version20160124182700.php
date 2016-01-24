<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20160124182700 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE xenobladex_monster (id INT AUTO_INCREMENT NOT NULL, monster_type_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, level_min SMALLINT NOT NULL, level_max SMALLINT NOT NULL, time VARCHAR(255) NOT NULL, weather VARCHAR(255) NOT NULL, is_unique TINYINT(1) NOT NULL, ep SMALLINT NOT NULL, aggression_day VARCHAR(255) NOT NULL, agression_night VARCHAR(255) NOT NULL, agression_skell_day VARCHAR(255) NOT NULL, agression_skell_night VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, location_note LONGTEXT NOT NULL, INDEX IDX_D29D083C672D3DAC (monster_type_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE xenobladex_monster_material (monster_id INT NOT NULL, material_id INT NOT NULL, INDEX IDX_9877B25EC5FF1223 (monster_id), INDEX IDX_9877B25EE308AC6F (material_id), PRIMARY KEY(monster_id, material_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE xenobladex_mapmarker_monster (id INT NOT NULL, monster_id INT DEFAULT NULL, INDEX IDX_5E42349AC5FF1223 (monster_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE xenobladex_monster ADD CONSTRAINT FK_D29D083C672D3DAC FOREIGN KEY (monster_type_id) REFERENCES xenobladex_monster_type (id)');
        $this->addSql('ALTER TABLE xenobladex_monster_material ADD CONSTRAINT FK_9877B25EC5FF1223 FOREIGN KEY (monster_id) REFERENCES xenobladex_monster (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE xenobladex_monster_material ADD CONSTRAINT FK_9877B25EE308AC6F FOREIGN KEY (material_id) REFERENCES xenobladex_item_material (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE xenobladex_mapmarker_monster ADD CONSTRAINT FK_5E42349AC5FF1223 FOREIGN KEY (monster_id) REFERENCES xenobladex_monster (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE xenobladex_mapmarker_monster ADD CONSTRAINT FK_5E42349ABF396750 FOREIGN KEY (id) REFERENCES xenobladex_mapmarker (id) ON DELETE CASCADE');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE xenobladex_monster_material DROP FOREIGN KEY FK_9877B25EC5FF1223');
        $this->addSql('ALTER TABLE xenobladex_mapmarker_monster DROP FOREIGN KEY FK_5E42349AC5FF1223');
        $this->addSql('DROP TABLE xenobladex_monster');
        $this->addSql('DROP TABLE xenobladex_monster_material');
        $this->addSql('DROP TABLE xenobladex_mapmarker_monster');
    }
}
