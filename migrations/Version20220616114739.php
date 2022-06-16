<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220616114739 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE turns (id INT AUTO_INCREMENT NOT NULL, hour VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE bookings ADD turn_id INT NOT NULL');
        $this->addSql('ALTER TABLE bookings ADD CONSTRAINT FK_7A853C351F4F9889 FOREIGN KEY (turn_id) REFERENCES turns (id)');
        $this->addSql('CREATE INDEX IDX_7A853C351F4F9889 ON bookings (turn_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE bookings DROP FOREIGN KEY FK_7A853C351F4F9889');
        $this->addSql('DROP TABLE turns');
        $this->addSql('DROP INDEX IDX_7A853C351F4F9889 ON bookings');
        $this->addSql('ALTER TABLE bookings DROP turn_id');
    }
}
