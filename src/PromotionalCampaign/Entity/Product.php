<?php

declare(strict_types=1);

namespace PromotionalCampaign\Entity;

class Product
{
    private string $code;

    private string $name;

    private float $price;

    private ?float $reducePrice;

    public function getCode(): string
    {
        return $this->code;
    }

    public function setCode(string $code): void
    {
        $this->code = $code;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }

    public function getPrice(): float
    {
        return $this->price;
    }

    public function setPrice(float $price): void
    {
        $this->price = $price;
    }

    public function getReducePrice(): ?float
    {
        return $this->reducePrice;
    }

    public function setReducePrice(?float $reducePrice): void
    {
        $this->reducePrice = $reducePrice;
    }
}
