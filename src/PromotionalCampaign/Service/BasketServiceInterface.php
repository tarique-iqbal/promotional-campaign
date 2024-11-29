<?php

declare(strict_types=1);

namespace PromotionalCampaign\Service;

interface BasketServiceInterface
{
    public function addToBasket(string $productCode): void;

    public function countPizzaInBasket(string $productCode): int;

    public function getTotalPrice(): float;

    public function decreaseTotalPrice(float $amount): void;
}
