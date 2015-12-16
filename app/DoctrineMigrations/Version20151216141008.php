<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20151216141008 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE xenobladex_attachment (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, path TINYTEXT NOT NULL, mime_type TINYTEXT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE xenobladex_map ADD attachment_id INT DEFAULT NULL, DROP image_path');
        $this->addSql('ALTER TABLE xenobladex_map ADD CONSTRAINT FK_7BFA5785464E68B FOREIGN KEY (attachment_id) REFERENCES xenobladex_attachment (id)');
        $this->addSql('CREATE INDEX IDX_7BFA5785464E68B ON xenobladex_map (attachment_id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE xenobladex_map DROP FOREIGN KEY FK_7BFA5785464E68B');
        $this->addSql('DROP TABLE xenobladex_attachment');
        $this->addSql('DROP INDEX IDX_7BFA5785464E68B ON xenobladex_map');
        $this->addSql('ALTER TABLE xenobladex_map ADD image_path VARCHAR(255) NOT NULL, DROP attachment_id');
    }
}
