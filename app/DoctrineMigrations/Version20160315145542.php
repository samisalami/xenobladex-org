<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20160315145542 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE xenobladex_equipupgradetier (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE xenobladex_equipupgradetier_material (monster_id INT NOT NULL, material_id INT NOT NULL, INDEX IDX_8288111AC5FF1223 (monster_id), INDEX IDX_8288111AE308AC6F (material_id), PRIMARY KEY(monster_id, material_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE xenobladex_equipupgradetier_material ADD CONSTRAINT FK_8288111AC5FF1223 FOREIGN KEY (monster_id) REFERENCES xenobladex_equipupgradetier (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE xenobladex_equipupgradetier_material ADD CONSTRAINT FK_8288111AE308AC6F FOREIGN KEY (material_id) REFERENCES xenobladex_item_material (id) ON DELETE CASCADE');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE xenobladex_equipupgradetier_material DROP FOREIGN KEY FK_8288111AC5FF1223');
        $this->addSql('DROP TABLE xenobladex_equipupgradetier');
        $this->addSql('DROP TABLE xenobladex_equipupgradetier_material');
    }
}
