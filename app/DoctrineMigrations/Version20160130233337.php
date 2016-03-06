<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20160130233337 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE xenobladex_monster ADD is_story TINYINT(1) NOT NULL, ADD hp VARCHAR(255) NOT NULL, ADD res_physic SMALLINT NOT NULL, ADD res_laser SMALLINT NOT NULL, ADD res_ether SMALLINT NOT NULL, ADD res_thermo SMALLINT NOT NULL, ADD res_electric SMALLINT NOT NULL, ADD res_gravit SMALLINT NOT NULL');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE xenobladex_monster DROP is_story, DROP hp, DROP res_physic, DROP res_laser, DROP res_ether, DROP res_thermo, DROP res_electric, DROP res_gravit');
    }
}
