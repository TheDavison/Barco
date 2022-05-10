<?php

namespace App\Entity;

use App\Repository\CreditCardRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CreditCardRepository::class)]
class CreditCard
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    private $creditNumber;

    #[ORM\Column(type: 'string', length: 255)]
    private $cardHolder;

    #[ORM\Column(type: 'datetime')]
    private $expirationDate;

    #[ORM\Column(type: 'string', length: 255)]
    private $cvv;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCreditNumber(): ?string
    {
        return $this->creditNumber;
    }

    public function setCreditNumber(string $creditNumber): self
    {
        $this->creditNumber = $creditNumber;

        return $this;
    }

    public function getCardHolder(): ?string
    {
        return $this->cardHolder;
    }

    public function setCardHolder(string $cardHolder): self
    {
        $this->cardHolder = $cardHolder;

        return $this;
    }

    public function getExpirationDate(): ?\DateTimeInterface
    {
        return $this->expirationDate;
    }

    public function setExpirationDate(\DateTimeInterface $expirationDate): self
    {
        $this->expirationDate = $expirationDate;

        return $this;
    }

    public function getCvv(): ?string
    {
        return $this->cvv;
    }

    public function setCvv(string $cvv): self
    {
        $this->cvv = $cvv;

        return $this;
    }
}
