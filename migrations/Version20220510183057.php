<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220510183057 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE credit_card (id INT AUTO_INCREMENT NOT NULL, credit_number VARCHAR(255) NOT NULL, card_holder VARCHAR(255) NOT NULL, expiration_date DATETIME NOT NULL, cvv VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE donation (id INT AUTO_INCREMENT NOT NULL, donator_id INT NOT NULL, credit_card_id INT NOT NULL, quantity DOUBLE PRECISION NOT NULL, date DATETIME NOT NULL, INDEX IDX_31E581A0831BACAF (donator_id), INDEX IDX_31E581A07048FD0F (credit_card_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, username VARCHAR(180) NOT NULL, roles LONGTEXT NOT NULL COMMENT \'(DC2Type:json)\', password VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_8D93D649F85E0677 (username), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE donation ADD CONSTRAINT FK_31E581A0831BACAF FOREIGN KEY (donator_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE donation ADD CONSTRAINT FK_31E581A07048FD0F FOREIGN KEY (credit_card_id) REFERENCES credit_card (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE donation DROP FOREIGN KEY FK_31E581A07048FD0F');
        $this->addSql('ALTER TABLE donation DROP FOREIGN KEY FK_31E581A0831BACAF');
        $this->addSql('DROP TABLE credit_card');
        $this->addSql('DROP TABLE donation');
        $this->addSql('DROP TABLE user');
    }
}
