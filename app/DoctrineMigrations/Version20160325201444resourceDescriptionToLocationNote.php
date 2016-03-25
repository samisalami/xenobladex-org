<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20160325201444resourceDescriptionToLocationNote extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $queryBuilder = $this->connection->createQueryBuilder();
        $queryBuilder
            ->select('*')
            ->from('xenobladex_item', 'x')
            ->where('x.item_type = "resource"');

        $resources = $queryBuilder->execute();

        foreach($resources as $resource) {
            $this->addSql('UPDATE xenobladex_item_resource SET location_note = "'.$resource['description'].'" WHERE id = '.$resource['id']);
            $this->addSql('UPDATE xenobladex_item SET description = "" WHERE id = '.$resource['id']);
        }
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');
    }
}
