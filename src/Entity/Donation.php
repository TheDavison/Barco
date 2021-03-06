<?php

namespace App\Entity;

use App\Repository\DonationRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: DonationRepository::class)]
class Donation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'donations')]
    #[ORM\JoinColumn(nullable: false)]
    private $donator;

    #[ORM\ManyToOne(targetEntity: CreditCard::class)]
    #[ORM\JoinColumn(nullable: false)]
    private $creditCard;

    #[ORM\Column(type: 'float')]
    private $quantity;

    #[ORM\Column(type: 'datetime')]
    private $date;

    #[ORM\Column(type: 'string', length: 255)]
    private $discordUsername;

    #[ORM\Column(type: 'string', length: 255)]
    private $type;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDonator(): ?User
    {
        return $this->donator;
    }

    public function setDonator(?User $donator): self
    {
        $this->donator = $donator;

        return $this;
    }

    public function getCreditCard(): ?CreditCard
    {
        return $this->creditCard;
    }

    public function setCreditCard(?CreditCard $creditCard): self
    {
        $this->creditCard = $creditCard;

        return $this;
    }

    public function getQuantity(): ?float
    {
        return $this->quantity;
    }

    public function setQuantity(float $quantity): self
    {
        $this->quantity = $quantity;

        return $this;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): self
    {
        $this->date = $date;

        return $this;
    }

    public function getDiscordUsername(): ?string
    {
        return $this->discordUsername;
    }

    public function setDiscordUsername(string $discordUsername): self
    {
        $this->discordUsername = $discordUsername;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): self
    {
        $this->type = $type;

        return $this;
    }
}
