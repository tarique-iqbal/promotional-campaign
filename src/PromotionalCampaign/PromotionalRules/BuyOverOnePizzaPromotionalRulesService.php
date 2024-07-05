<?php

declare(strict_types=1);

namespace PromotionalCampaign\PromotionalRules;

use PromotionalCampaign\Repository\ProductRepositoryInterface;
use PromotionalCampaign\Service\BasketServiceInterface;

readonly class BuyOverOnePizzaPromotionalRulesService implements PromotionalRulesServiceInterface
{
    private const ORDER = 1;

    public function __construct(
        private BasketServiceInterface $basketService,
        private ProductRepositoryInterface $productRepository
    ) {
    }

    public function apply(): void
    {
        $pizzaCount = $this->basketService->countPizzaInBasket(self::PRODUCT_CODE_PIZZA);

        if ($pizzaCount > 1) {
            $productPizza = $this->productRepository->findByCode(self::PRODUCT_CODE_PIZZA);
            $reduceAmount = ($productPizza->getPrice() - $productPizza->getReducePrice()) * $pizzaCount;
            $this->basketService->decreaseTotalPrice($reduceAmount);
        }
    }

    public static function getOrder(): int
    {
        return self::ORDER;
    }
}
