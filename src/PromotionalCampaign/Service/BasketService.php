<?php

declare(strict_types=1);

namespace PromotionalCampaign\Service;

use PromotionalCampaign\Repository\ProductRepositoryInterface;

class BasketService implements BasketServiceInterface
{
    private const CURRENCY_SYMBOL = '€';

    private array $productCodes = [];

    private float $totalPrice = 0.0;

    public function __construct(
        private readonly ProductRepositoryInterface $productRepository
    ) {
    }

    public function addToBasket(string $productCode): void
    {
        $product = $this->productRepository->findByCode($productCode);
        $this->productCodes[] = $product->getCode();
        $this->addTotalPrice($product->getPrice());
    }

    public function countPizzaInBasket(string $productCode): int
    {
        if (in_array($productCode, $this->productCodes, true)) {
            return array_count_values($this->productCodes)[$productCode];
        }

        return 0;
    }

    public function getTotalPrice(): float
    {
        return $this->totalPrice;
    }

    public function getCurrencySymbol(): string
    {
        return self::CURRENCY_SYMBOL;
    }

    public function decreaseTotalPrice(float $amount): void
    {
        $this->totalPrice -= $amount;
    }

    private function addTotalPrice(float $price): void
    {
        $this->totalPrice += $price;
    }
}
